import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

import moment from 'moment';
import PrimaryButton from '@/components/PrimaryButton';
import { MoviePublishToggle } from '@/components/MoviePublishToggle';

export default function User(props) {
    const MoviePoster = ({ movie }) => {
        const [isPosterLarge, makePosterLarge] = useState(false);

        return (
            <div className="relative w-full" onMouseEnter={e => makePosterLarge(true)} onMouseLeave={e => makePosterLarge(false)}>
                <img src={`${props.ziggy.url}/storage/${movie.poster}`} className="h-16 w-auto rounded-box" />
                {
                    isPosterLarge ?
                        <div className="absolute right-0  top-0 z-10">
                            <img src={`${props.ziggy.url}/storage/${movie.poster}`} className="!w-96 h-auto rounded-box" />
                        </div>
                        : ''
                }
            </div>
        );
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movies</h2>}
        >
            <Head title="Movies" />

            <div className="pb-5 flex justify-between">

                <Link className='btn' href={route('movie.create')}>Add movie</Link>
                <div className="grow flex justify-end space-x-3">
                    <button className='btn' onClick={() => { window.location.search = "published=true" }}>Published Movies</button>
                    <button className='btn' onClick={() => { window.location.search = "" }}>All movies</button>
                    <button className='btn' onClick={() => { window.location.reload() }}>Refresh</button>
                </div>
            </div>
            <div className=" overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Release Date</th>
                            <th>No of Favourites</th>
                            <th>Publish</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {props.movies.map((movie, index) =>
                            <tr>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="w-64 whitespace-pre-wrap">
                                        {movie.title}
                                    </div>
                                </td>
                                <td>{moment(movie.release_date).format("Y-M-d")}</td>
                                <td>{movie.favourites_count}</td>
                                <td>
                                    <MoviePublishToggle published={movie.published} id={movie.id} />
                                </td>
                                <td >
                                    <div className="flex space-x-3">
                                        <Link href={route('movie.show', movie.id)} className="btn btn-ghost">View</Link>
                                        <Link href={route('movie.edit', movie.id)} className="btn btn-ghost">Edit</Link>
                                        <PrimaryButton>Delete</PrimaryButton>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div></div>
            {/* </div> */}
        </AuthenticatedLayout>
    );
}
