import {useState, useEffect, useCallback} from 'react';
import { BiCalendar } from "react-icons/bi";
import Search from './components/Search';
import AddAppointment from './components/AddAppoinment';
//import appointmentList from './data.json';
import Appointmentinfo from './components/Appointmentinfo';

const App = () => {
	let [appointmentList, setAppointmentList] = useState([]);
	let [query, setQuery] = useState("");
	let [sortBy, setSortBy] = useState("petName");
	let [orderBy, setOrderBy] = useState("asc");

	const filterAppointments = appointmentList.filter(item => {
		return (
			item.petName.toLowerCase().includes(query.toLowerCase()) ||
			item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
			item.aptNotes.toLowerCase().includes(query.toLowerCase())
		)
	}).sort((a, b) => {
		let order = (orderBy === "asc") ? 1 : -1;
		return (
			a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
				? -1 * order : 1 * order
		)
	})

	// we are retrieving that data and we are asking the 
	// useCallback hook to monitor any changes that happends to that data.
	const fetchData = useCallback(() => {
		fetch('./data.json')
		.then(response => response.json())
		.then(data => {
			setAppointmentList(data)
		})
		.catch(err => console.log('%c%s', 'color: #00e600', 'ERROR:', err));
	}, []);

	// ask useffect hook to track the fetching of data.
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="App container mx-auto mt-3 font-thin">
			<h1 className="text-5xl">
				<BiCalendar className="inline-block text-red-400 align-top mb-3"/> 
					Your Appointments 
				</h1>
			<AddAppointment
				onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
				lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
			/>
			<Search 
				query={query}
				onQueryChange={myQuery => setQuery(myQuery)}
				orderBy={orderBy}
				onOrderByChange={mySort => setOrderBy(mySort)} 
				sortBy={sortBy}
				onSortByChange={mySort => setSortBy(mySort)}
			/>

			<ul className="divide-y divide-gray-200">
				{filterAppointments
					.map(appointment => (
					<Appointmentinfo 
						key={appointment.id} 
						appointment={appointment}
						onDeleteAppointment={
							appointmentId =>
								setAppointmentList(appointmentList.filter(appointment =>
								appointment.id !== appointmentId))
						}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;