const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			signUp: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/sign-up', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});

					let data = await response.json();
					console.log(data);
					return data;
				} catch (error) {
					console.log("there was an error on signup", error);
					throw error
				}
			},
			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					if (response.status===200){
						let data = await response.json();
						sessionStorage.setItem('token', data.token)
						return true
					} else if(response.status===401){
						return false
					} else {
						console.log('unexpected error during login', response.status)
						return false
					}
				} catch(error){
					console.log('unexpected error during login', error)
						return false
				}
			},
			goPrivate: async() => {
				if (sessionStorage.getItem('token')) {
					try {
						let response = await fetch(process.env.BACKEND_URL + '/api/private', {
							headers: {
								Authorization: "Bearer " + sessionStorage.getItem('token')
							}
						})
						if (!response.ok) {
							return false
						} else {
							let data = await response.json()
							console.log(data)
							return true
						}
					} catch (error) {
						console.log(error)
					} return false
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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
			}
		}
	};
};

export default getState;
