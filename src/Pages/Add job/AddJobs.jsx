import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';
const AddJobs = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleAddJobs = e => {
        e.preventDefault();
        const form = e.target
        const job_title = form.jobTitle.value
        const email = form.email.value;
        const minamount = form.minamount.value;
        const maxamount = form.maxamount.value;
        const price_range = `${minamount}-${maxamount}`
        const deadline = form.deadline.value;
        const short_description = form.shortDescription.value;
        const type = form.type.value;
        const jobInfo = { job_title, email, price_range, deadline, short_description, type }

        console.log(jobInfo)

        ///create bids form data and send into the database
        fetch(`https://job-seeker-server-liard.vercel.app/alljobs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast("Add job successfully!");
                setInterval(5000)
                console.log("Need time")
            })

        navigate('/mypostedjob')
    }
    return (
        <div className="hero ">
            <div className="hero-content ">
                <div className="card flex-shrink-0 w-full">
                    <form onSubmit={handleAddJobs} className="card-body">
                        <div className='flex-row md:flex-col lg:flex '>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" defaultValue={user?.email} readOnly className="input text-white  w-full text-sm" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Job Title</span>
                                </label>
                                <input type="text" name='jobTitle' placeholder="Job title" className="input text-white  w-full" required />
                            </div>
                        </div>

                        <div className='flex-row md:flex-col lg:flex '>
                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Minimum Amount</span>
                                </label>
                                <input type="number" name='minamount' placeholder="Minimum amount" className="input text-white  " required />
                            </div>
                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Maximum Amount</span>
                                </label>
                                <input type="number" name='maxamount' placeholder="Maximum amount" className="input text-white  " required />
                            </div>
                        </div>
                        <div className='flex-row md:flex-col lg:flex '>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                </label>
                                <input type="date" name='deadline' placeholder="password" className="input text-white " required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type</span>
                                </label>
                                <input type="text" name='type' placeholder="Job Type" className="input text-white  w-full" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <input type="text" name='shortDescription' placeholder="Short Description" className="input text-white  w-full h-24" required />
                        </div>
                        <div className="form-control w-11 mt-6">
                            <button className="btn btn-primary w-full">Add job</button>
                            <ToastContainer />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddJobs;