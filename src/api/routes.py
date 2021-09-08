"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, CardSet
# from flask_cors import CORS
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from argon2 import PasswordHasher

ph = PasswordHasher()
api = Blueprint('api', __name__)

# CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    content = request.get_json(silent=True)
    user = User(email = content["email"], password = ph.hash(content["password"]), is_active = True)

    db.session.add(user)
    db.session.commit()

    response_body = {
        "message": "User Created"
    }

    return jsonify(response_body), 204

@api.route('/login', methods=['POST'])
def login():

    content = request.get_json()
    print(content)
    user = User.query.filter(User.email == content["email"]).first()
    if user is None:
        return jsonify({"message": "invalid user"}), 403
    
    try:
        ph.verify(user.password, content["password"])
    except:
        return jsonify({"message": "invalid password"}), 403
        
    access_token = create_access_token(identity=user.id, additional_claims={"email":user.email})
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/userinfo', methods=['GET'])
@jwt_required()
def userinfo():
    current_user_id = get_jwt_identity()
    
    user = User.query.filter(User.id == current_user_id).first()
    
    response_body = {
        "message": f"Hello {user.email} "
    }

    return jsonify(response_body), 200

    
@api.route('/set', methods=['GET'])
def getAllSets():
    all_sets = CardSet.query.all()
    all_sets = list(map(lambda x: x.serialize(), all_sets))
    response_body = {
        "msg": "Here are all of the sets."
    }
    return jsonify(all_sets), 200

@api.route('/set', methods=['POST']) #Adds a new set to the list 
def add_set():
    set_info = request.get_json()
    if set_info is None:
        raise APIException("Your JSON body is wrong", 400)
    new_set= CardSet(
        setId =set_info['setId'],
        name=set_info['name'],
        series=set_info['series'],
        printedTotal=set_info['printedTotal'],
        total=set_info['total'],
        ptcgoCode=set_info['ptcgoCode'],
        releaseDate=set_info['releaseDate'],
        updatedAt=set_info['updatedAt'],
        symbolUrl=set_info['symbolUrl'],
        logoUrl=set_info['logoUrl']
        
        ) 
    db.session.add(new_set) 
    db.session.commit()
    newDict = new_set.serialize()
    return jsonify(newDict), 200 

@api.route('/apiset', methods=['POST']) #Adds a new set to the list 
def add_all_sets():
    all_sets_info = request.get_json()
    if all_sets_info is None:
        raise APIException("Your JSON body is wrong", 400)
    for set_info in all_sets_info:
        new_set= CardSet(
            setId =set_info['setId'],
            name=set_info['name'],
            series=set_info['series'],
            printedTotal=set_info['printedTotal'],
            total=set_info['total'],
            ptcgoCode=set_info['ptcgoCode'],
            releaseDate=set_info['releaseDate'],
            updatedAt=set_info['updatedAt'],
            symbolUrl=set_info['symbolUrl'],
            logoUrl=set_info['logoUrl']
            
            ) 
        db.session.add(new_set) 
        db.session.commit()
        newDict = new_set.serialize()
    return jsonify(newDict), 200 

@api.route('/test', methods=['POST']) #Adds a new set to the list 
def add_all_sets_test():
    all_sets_info = request.get_json()
    if all_sets_info is None:
        raise APIException("Your JSON body is wrong", 400)
    for set_info in all_sets_info:
        new_set= CardSet(
            setId =set_info['id'],
            name=set_info['name'],
            series=set_info['series'],
            printedTotal=set_info['printedTotal'],
            total=set_info['total'],
            ptcgoCode=set_info['ptcgoCode'],
            releaseDate=set_info['releaseDate'],
            updatedAt=set_info['updatedAt'],
            symbolUrl=set_info['images']['symbol'],
            logoUrl=set_info['images']['logo']
            
            ) 
        db.session.add(new_set) 
        db.session.commit()
        newDict = new_set.serialize()
    return jsonify(newDict), 200 