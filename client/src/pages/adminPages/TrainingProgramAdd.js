import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-slider';
import '@esri/calcite-components/components/calcite-switch';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
/* import '../../styles/adminStyles/trainingAdd.css'; */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const TYPE_OPTIONS = ['WEB COURSE', 'INSTRUCTOR-LED', 'TRAINING SEMINAR', 'ARCGIS LAB'];
const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];
const COLOR_PRESETS = ['#0079c1', '#8b4789', '#149ece', '#00897b', '#d84315', '#35ac46'];

export default function TrainingProgramAdd() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        type: 'WEB COURSE',
        title: '',
        duration: '',
        date: '',
        level: 'Beginner',
        description: '',
        difficulty: 3,
        color: '#0079c1',
        isFree: false,
        requiresMaintenance: false
    });

    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchProgram();
        }
    }, [id, isEdit]);

    const fetchProgram = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/services/training/${id}`);
            setFormData(response.data);
        } catch (err) {
            setError('Failed to load program');
            console.error(err);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');

            if (isEdit) {
                await axios.put(`${API_URL}/api/services/training/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/services/training`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            navigate('/admin/services/trainings');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save program');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page training-add-page">
                <div className="admin-page-header">
                    <div>
                        <h1>{isEdit ? 'Edit' : 'Add'} Training Program</h1>
                        <p>Fill in the details and see a live preview</p>
                    </div>
                    <calcite-button
                        appearance="outline"
                        icon-start="arrow-left"
                        onClick={() => navigate('/admin/services/trainings')}
                    >
                        Back to List
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div className="service-add-grid">
                    {/* Left Side - Form */}
                    <div className="service-form-container">
                        <form onSubmit={handleSubmit}>
                            {/* Basic Info */}
                            <div className="form-section">
                                <h3>Basic Information</h3>

                                <calcite-label>
                                    Course Type
                                    <calcite-select
                                        value={formData.type}
                                        onCalciteSelectChange={(e) => handleChange('type', e.target.value)}
                                    >
                                        {TYPE_OPTIONS.map(type => (
                                            <calcite-option key={type} value={type}>
                                                {type}
                                            </calcite-option>
                                        ))}
                                    </calcite-select>
                                </calcite-label>

                                <calcite-label>
                                    Title
                                    <calcite-input
                                        value={formData.title}
                                        onCalciteInputInput={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., Introduction to ArcGIS Pro"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Duration
                                    <calcite-input
                                        value={formData.duration}
                                        onCalciteInputInput={(e) => handleChange('duration', e.target.value)}
                                        placeholder="e.g., 1 Hour, 5 Minutes or 3 Days"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Date/Schedule
                                    <calcite-input
                                        value={formData.date}
                                        onCalciteInputInput={(e) => handleChange('date', e.target.value)}
                                        placeholder="e.g., Self-paced or Jan 15-17, 2025"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Level
                                    <calcite-select
                                        value={formData.level}
                                        onCalciteSelectChange={(e) => handleChange('level', e.target.value)}
                                    >
                                        {LEVEL_OPTIONS.map(level => (
                                            <calcite-option key={level} value={level}>
                                                {level}
                                            </calcite-option>
                                        ))}
                                    </calcite-select>
                                </calcite-label>

                                <calcite-label>
                                    Description
                                    <calcite-text-area
                                        value={formData.description}
                                        onCalciteTextAreaInput={(e) => handleChange('description', e.target.value)}
                                        placeholder="Brief description of the training program"
                                        rows="3"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>
                            </div>

                            {/* Difficulty & Color */}
                            <div className="form-section">
                                <h3>Difficulty & Appearance</h3>

                                <calcite-label>
                                    Difficulty Level (1-5)
                                    <div style={{ marginTop: '16px' }}>
                                        <calcite-slider
                                            min="1"
                                            max="5"
                                            value={formData.difficulty}
                                            onCalciteSliderChange={(e) => handleChange('difficulty', parseInt(e.target.value))}
                                            labelTicks
                                            ticks="1"
                                        ></calcite-slider>
                                    </div>
                                    <div className="difficulty-preview">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`difficulty-circle ${level <= formData.difficulty ? 'filled' : ''}`}
                                            ></div>
                                        ))}
                                    </div>
                                </calcite-label>

                                <calcite-label>
                                    Color
                                    <div className="color-picker-container">
                                        <input
                                            type="color"
                                            value={formData.color}
                                            onChange={(e) => handleChange('color', e.target.value)}
                                            className="color-input"
                                        />
                                        <div className="color-presets">
                                            {COLOR_PRESETS.map(color => (
                                                <div
                                                    key={color}
                                                    className="color-preset"
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => handleChange('color', color)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </calcite-label>
                            </div>

                            {/* Options */}
                            <div className="form-section">
                                <h3>Options</h3>

                                <calcite-label>
                                    <calcite-switch
                                        checked={formData.isFree}
                                        onCalciteSwitchChange={(e) => handleChange('isFree', e.target.checked)}
                                    ></calcite-switch>
                                    Free Course
                                </calcite-label>

                                <calcite-label style={{ marginTop: '16px' }}>
                                    <calcite-switch
                                        checked={formData.requiresMaintenance}
                                        onCalciteSwitchChange={(e) => handleChange('requiresMaintenance', e.target.checked)}
                                    ></calcite-switch>
                                    Requires Maintenance Program
                                </calcite-label>
                            </div>

                            {/* Submit Button */}
                            <div className="form-actions">
                                <calcite-button
                                    type="submit"
                                    appearance="solid"
                                    kind="brand"
                                    width="full"
                                    loading={saving}
                                >
                                    {isEdit ? 'Update' : 'Create'} Program
                                </calcite-button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Live Preview */}
                    <div className="service-preview-container">
                        <div className="preview-header">
                            <h3>Live Preview</h3>
                            <p>Esri-style training card</p>
                        </div>

                        <div className="training-card-esri preview-card">
                            {/* Free Badge */}
                            {formData.isFree && (
                                <div className="training-badge-free">FREE</div>
                            )}

                            {/* Course Type */}
                            <div className="training-type">{formData.type}</div>

                            {/* Title */}
                            <h3 className="training-title-esri">
                                {formData.title || 'Training Program Title'}
                            </h3>

                            {/* Duration */}
                            <p className="training-duration-esri">
                                {formData.duration || 'Duration'}
                            </p>

                            {/* Difficulty Circles */}
                            <div className="training-difficulty">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`difficulty-circle ${level <= formData.difficulty ? 'filled' : ''}`}
                                    ></div>
                                ))}
                                <span className="difficulty-count">({formData.difficulty})</span>
                            </div>

                            {/* Maintenance Badge */}
                            {formData.requiresMaintenance && (
                                <div className="training-maintenance">
                                    <calcite-icon icon="lock" scale="s"></calcite-icon>
                                    Requires Esri Maintenance Program
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="training-actions-esri">
                                <calcite-button
                                    appearance="transparent"
                                    icon-start="heart"
                                    scale="s"
                                ></calcite-button>
                                <calcite-button
                                    appearance="transparent"
                                    icon-start="plus-circle"
                                    scale="s"
                                ></calcite-button>
                            </div>

                            {/* Register Button */}
                            <div className="training-register">
                                <calcite-button
                                    width="full"
                                    appearance="solid"
                                    scale="m"
                                >
                                    Register
                                </calcite-button>
                                <p className="training-date">{formData.date || 'Date'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </calcite-shell>
    );
}
