import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
	// State to manage form data, error messages, and loading state
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	// Function to handle changes in form input fields
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Start loading state
			setLoading(true);

			// Sending a POST  request to the server with form data
			const res = await fetch('/api/auth/signup', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			// Parsing the response from the server
			const data = await res.json();
			console.log(data);

			// Handling the response data
			if(data.success === false) {
				setLoading(false);
				setError(data.message);
				return;
			}

			// Stop loading and clear error if successful
			setLoading(false);
			setError(null);
		} catch (error) {
			// Stop loading set error if an exceptio occurs
			setLoading(false);
			setError(error.message);
		}
	};

// JSX for rendering the component	
  return (
    <div className="p-3 max-w-lg mx-auto">
		<h1 className='text-3xl text-center font-semibold my-7 text-teal-600'>Sign Up</h1>
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<input type="text" placeholder="username"
			className="border p-3 rounded-lg" id="username" onChange={handleChange} />
			<input type="email" placeholder="email"
			className="border p-3 rounded-lg" id="email" onChange={handleChange} />
			<input type="password" placeholder="password"
			className="border p-3 rounded-lg" id="password" onChange={handleChange} />
			<button disabled={loading} className="bg-576f56 text-white p-3 rounded-lg 
			uppercase hover:opacity-80 disabled:opacity-70">
				{loading ? 'loading...' : 'Sign up'}
			</button>
		</form>
		<div className="flex gap-2 mt-5">
			<p className="text-white">Have an account?</p>
			<Link to={"/sign-in"}>
				<span className="text-teal-600">Sign in</span>
			</Link>
		</div>
		{error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
