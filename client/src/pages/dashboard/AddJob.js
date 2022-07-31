import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/styledWrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position input */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company input */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location input */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          {/* job status */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
