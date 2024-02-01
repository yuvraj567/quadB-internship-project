import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './App.css'

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setData(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">
        ReactJS Internship Test
      </h1>

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <table className='w-full border-separate border-spacing-2 p-2'>
              <thead>
                <tr>
                  <th className='border border-slate-600 rounded-md'>No</th>
                  <th className='border border-slate-600 rounded-md'>Name</th>
                  <th className='border border-slate-600 rounded-md max-md:hidden'>Duration </th>

                  <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                  <th className='border border-slate-600 rounded-md'>Summary</th>
                </tr>
              </thead>

              <tbody>
                {data.map((post, index) => (
                  <tr key={index} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>
                      {index + 1}
                    </td>

                    <td className='border border-slate-700 rounded-md text-center'>
                      {post.show.name} 
                    </td>

                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                      {post.show.runtime} 
                    </td>

                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                      {post.show.premiered}
                    </td>

                    <td className='border border-slate-700 rounded-md text-center'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/post/${post.show.id}`}>
                          <button>Show Summary</button>
                        </Link>
                      </div>
                    </td>

                </tr>
                ))}

              </tbody>
            </table>
          </div>

        )}
      </div>  
    </div>
  )
}

export default Home;
