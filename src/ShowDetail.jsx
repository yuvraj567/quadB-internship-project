import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/shows/${id}`)
    .then(response => {
        setShow(response.data);
        setLoading(false);
    })
    .catch(error => {
        console.error(error)
        setLoading(false)
    });
}, [id]);

  if (!show) {
    return <Spinner/>;
  }

  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Summary</h1>
        
        {loading? (
            <Spinner/>
        ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                <div className='my-4 flex'>
                    <h2 className='text-xl mr-4 text-gray-500'>Name:</h2>
                    <h2 className='text-xl'>{show.name}</h2>
                </div>

                <div className='my-4 flex'>
                    <h2 className='text-xl mr-4 text-gray-500'>Id:</h2>
                    <h2 className='text-xl'>{show.id}</h2>
                </div>

                <div className='my-4 flex'>
                    <h2 className='text-xl mr-4 text-gray-500'>Url:</h2>
                    <a href={show.url} className='text-xl text-blue-500 hover:text-blue-700 font-bold'>{show.url}</a>
                </div>

                <div className='my-4 flex'>
                    <h2 className='text-xl mr-4 text-gray-500'>Image:</h2>
                    <img src={show.image.medium} alt={show.name} className='rounded-lg shadow-md hover:opacity-75 transition-transform transform hover:scale-105'/>
                </div>

                <div className='my-4 flex'>
                    <h2 className='text-xl mr-4 text-gray-500'>Summary:</h2>
                    <h2 className='text-xl'>{show.summary}</h2>
                </div>
            </div>
        )}

    </div>
  );
};

export default ShowDetail;
