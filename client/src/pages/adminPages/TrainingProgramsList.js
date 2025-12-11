import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';
import '../../styles/adminStyles/trainingList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function TrainingProgramsList() {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchPrograms();
    }, [filter]);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/services/training`, {
                params: { level: filter }
            });
            setPrograms(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load training programs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this training program?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_URL}/api/services/training/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPrograms();
        } catch (err) {
            alert('Failed to delete program');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <calcite-shell>
                <AdminNavbar />
                <AdminSidebar />
                <div className="admin-page">
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <calcite-loader active></calcite-loader>
                    </div>
                </div>
            </calcite-shell>
        );
    }

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>Training Programs</h1>
                        <p>Manage your training courses and programs</p>
                    </div>
                    <calcite-button
                        icon-start="plus"
                        onClick={() => navigate('/admin/services/trainings/add')}
                    >
                        Add New Program
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                {/* Filters */}
                <div className="training-filters">
                    <calcite-button
                        appearance={filter === 'all' ? 'solid' : 'outline'}
                        kind="brand"
                        onClick={() => setFilter('all')}
                    >
                        All Levels
                    </calcite-button>
                    <calcite-button
                        appearance={filter === 'Beginner' ? 'solid' : 'outline'}
                        kind="brand"
                        onClick={() => setFilter('Beginner')}
                    >
                        Beginner
                    </calcite-button>
                    <calcite-button
                        appearance={filter === 'Intermediate' ? 'solid' : 'outline'}
                        kind="brand"
                        onClick={() => setFilter('Intermediate')}
                    >
                        Intermediate
                    </calcite-button>
                    <calcite-button
                        appearance={filter === 'Advanced' ? 'solid' : 'outline'}
                        kind="brand"
                        onClick={() => setFilter('Advanced')}
                    >
                        Advanced
                    </calcite-button>
                </div>

                <div className="training-grid-esri">
                    {programs.map((program) => (
                        <div key={program._id} className="training-card-esri">
                            {/* Free Badge */}
                            {program.isFree && (
                                <div className="training-badge-free">FREE</div>
                            )}

                            {/* Course Type */}
                            <div className="training-type">{program.type}</div>

                            {/* Title */}
                            <h3 className="training-title-esri">{program.title}</h3>

                            {/* Duration */}
                            <p className="training-duration-esri">{program.duration}</p>

                            {/* Difficulty Circles */}
                            <div className="training-difficulty">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`difficulty-circle ${level <= program.difficulty ? 'filled' : ''}`}
                                    ></div>
                                ))}
                                <span className="difficulty-count">({program.difficulty})</span>
                            </div>

                            {/* Maintenance Badge */}
                            {program.requiresMaintenance && (
                                <div className="training-maintenance">
                                    <calcite-icon icon="lock" scale="s"></calcite-icon>
                                    Requires Maintenance Program
                                </div>
                            )}

                            {/* Date */}
                            <div className="training-date-display">
                                <calcite-icon icon="calendar" scale="s"></calcite-icon>
                                {program.date}
                            </div>

                            {/* Actions */}
                            <div className="training-card-actions">
                                <calcite-button
                                    appearance="outline"
                                    kind="brand"
                                    icon-start="pencil"
                                    scale="s"
                                    onClick={() => navigate(`/admin/services/trainings/edit/${program._id}`)}
                                >
                                    Edit
                                </calcite-button>
                                <calcite-button
                                    appearance="outline"
                                    kind="danger"
                                    icon-start="trash"
                                    scale="s"
                                    onClick={() => handleDelete(program._id)}
                                >
                                    Delete
                                </calcite-button>
                            </div>
                        </div>
                    ))}
                </div>

                {programs.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No training programs yet</h3>
                        <p>Click "Add New Program" to create your first training program</p>
                    </div>
                )}
            </div>
        </calcite-shell>
    );
}
