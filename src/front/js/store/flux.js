import { AllSets } from "../../../../data/sets/sets.js";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			setList: [],
			currentSet: [],
			message: null,
			authToken: null,
			authError: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			registerUser: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status !== 204) {
							throw new Error("register-error");
						}

						getActions().loginUser(email, password);
					})
					.catch(error => setStore({ authError: error, authToken: null }));
			},

			logout: () => setStore({ authToken: { ...null } }),

			loginUser: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status !== 200) {
							throw new Error("authentication-error");
						}

						return resp.json();
					})
					.then(data => setStore({ authToken: data.token, authError: null }))
					.catch(error => setStore({ authToken: null, authError: error }));
			},

			getSets: () => {
				// fetching data from the backend

				setStore({ setList: AllSets });
			},
			setCurrentSetID: setID => {
				const store = getStore();
				const actions = getActions();

				setStore({ currentSetID: setID });
				actions.getCardsForSet(setID);
			},
		
		getCardsForSet: setID => {
			// fetching all cards from specific set from the pokemontcg.io
			fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setID}&orderBy=number`)
				.then(resp => resp.json())
				.then(data => setStore({ currentSet: data }))
				.catch(error => console.log("Error fetching Cards from pokemontcg.io api", error));
		}},
	};
};

export default getState;
