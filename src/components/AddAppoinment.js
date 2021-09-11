import { BiCalendarPlus } from "react-icons/bi";
import { useState } from 'react';

const AddAppointment = ({ onSendAppointment, lastId }) => {
  const clearData = {
    ownerName: '',
    petName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: ''
  }
  let [toggleForm, setToggleForm] = useState(false)
  let [formData, setFormData] = useState(clearData)

  let {
    ownerName,
    petName,
    aptDate,
    aptTime,
    aptNotes
  } = formData;

  const formDataPublish = () => {
    const appointmentInfo = {
      id: lastId + 1,
      ownerName,
      petName,
      aptDate: aptDate + ' ' + aptTime,
      aptNotes
    }
    onSendAppointment(appointmentInfo);
    setFormData(clearData);
    setToggleForm(!toggleForm)
  }

  const handleFormDate = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    })
  }


  console.log('formData :>> ', formData);

  return (
    <div>
      <button onClick={() => { setToggleForm(!toggleForm) }}
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md
        ${toggleForm ? 'rounded-t-md' : 'rounded-md'}`}>
        <div><BiCalendarPlus className="inline-block align-text-top" />  Add Appointment</div>
      </button>
      {
        toggleForm &&
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Owner Name
          </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="ownerName" id="ownerName"
                onChange={ handleFormDate('ownerName') }
                value={formData.ownerName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Pet Name
          </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="petName" id="petName"
                onChange={ handleFormDate('petName') }
                value={formData.petName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Apt Date
          </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="date" name="aptDate" id="aptDate"
                onChange={handleFormDate('aptDate')}
                value={formData.aptDate}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Apt Time
          </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="time" name="aptTime" id="aptTime"
                onChange={handleFormDate('aptTime')}
                value={formData.aptTime}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Appointment Notes
          </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea id="aptNotes" name="aptNotes" rows="3"
                onChange={handleFormDate('aptNotes')}
                value={formData.aptNotes}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Detailed comments about the condition"></textarea>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button type="submit" onClick={formDataPublish} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                Submit
            </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default AddAppointment