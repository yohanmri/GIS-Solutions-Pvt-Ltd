const mongoose = require('mongoose');
const ProfessionalService = require('./models/ProfessionalService');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gis-solutions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Atlas connected to GIS-Solutions-Pvt-Ltd'))
    .catch(err => console.error('MongoDB connection error:', err));

const services = [
    {
        icon: 'map',
        title: 'GIS Mapping & Cartography',
        category: 'mapping',
        description: 'Professional mapping solutions with precision and clarity for all your spatial data needs.',
        color: '#35ac46',
        features: [
            'Topographic Mapping',
            'Digital Map Production',
            'Custom Cartography',
            'Web Map Services',
            '3D Mapping',
            'Thematic Mapping'
        ],
        benefits: [
            'High-quality visual representation of spatial data',
            'Enhanced decision-making capabilities',
            'Professional cartographic design',
            'Multi-format output (PDF, Web, Print)'
        ],
        applications: ['Urban Planning', 'Infrastructure', 'Real Estate', 'Tourism'],
        technologies: ['ArcGIS Pro', 'QGIS', 'Adobe Illustrator', 'Mapbox'],
        isActive: true
    },
    {
        icon: 'layers',
        title: 'Spatial Analysis',
        category: 'analysis',
        description: 'Transform complex data into actionable geographic insights and intelligent decisions.',
        color: '#149ece',
        features: [
            'Site Suitability Analysis',
            'Network Analysis',
            'Buffer & Proximity Analysis',
            'Hotspot Analysis',
            'Overlay Analysis',
            'Terrain Analysis'
        ],
        benefits: [
            'Data-driven decision making',
            'Identify optimal locations and routes',
            'Understand spatial patterns and relationships',
            'Risk assessment and mitigation'
        ],
        applications: ['Site Selection', 'Route Optimization', 'Market Analysis', 'Risk Assessment'],
        technologies: ['ArcGIS Spatial Analyst', 'PostGIS', 'Python', 'R'],
        isActive: true
    },
    {
        icon: 'satellite-3',
        title: 'Remote Sensing',
        category: 'remote-sensing',
        description: 'Advanced satellite imagery processing and interpretation for environmental monitoring.',
        color: '#a6ce39',
        features: [
            'Land Cover Mapping',
            'Change Detection',
            'Image Classification',
            'NDVI Analysis',
            'Multispectral Analysis',
            'Temporal Analysis'
        ],
        benefits: [
            'Monitor large areas efficiently',
            'Cost-effective data collection',
            'Historical and real-time analysis',
            'Environmental change detection'
        ],
        applications: ['Agriculture', 'Forestry', 'Environmental Monitoring', 'Disaster Management'],
        technologies: ['ENVI', 'ERDAS Imagine', 'Google Earth Engine', 'Sentinel Hub'],
        isActive: true
    },
    {
        icon: 'gear',
        title: 'GIS Consulting',
        category: 'consulting',
        description: 'Expert guidance for implementing and optimizing your GIS infrastructure and workflows.',
        color: '#007ac2',
        features: [
            'GIS Strategy Development',
            'Database Design',
            'Workflow Optimization',
            'Training Programs',
            'Best Practices Implementation',
            'Technology Assessment'
        ],
        benefits: [
            'Maximize ROI on GIS investments',
            'Improved operational efficiency',
            'Staff capability development',
            'Strategic technology roadmap'
        ],
        applications: ['Enterprise GIS', 'System Implementation', 'Staff Training', 'Process Improvement'],
        technologies: ['ArcGIS Enterprise', 'PostgreSQL/PostGIS', 'Custom Solutions', 'Cloud Platforms'],
        isActive: true
    },
    {
        icon: 'code',
        title: 'Custom Development',
        category: 'development',
        description: 'Tailored GIS applications and tools built specifically for your business requirements.',
        color: '#8b4789',
        features: [
            'Web GIS Applications',
            'Mobile GIS Solutions',
            'API Integration',
            'Custom Tools & Widgets',
            'Dashboard Development',
            'Automation Scripts'
        ],
        benefits: [
            'Solutions tailored to your needs',
            'Enhanced user experience',
            'Integration with existing systems',
            'Improved productivity and efficiency'
        ],
        applications: ['Field Data Collection', 'Asset Management', 'Public Portals', 'Decision Support'],
        technologies: ['ArcGIS API for JavaScript', 'Leaflet', 'React', 'Python', 'Node.js'],
        isActive: true
    },
    {
        icon: 'data-check',
        title: 'Data Management',
        category: 'data',
        description: 'Comprehensive spatial data management, quality control, and database administration.',
        color: '#f89927',
        features: [
            'Data Migration',
            'Quality Assurance/Quality Control',
            'Database Administration',
            'Data Conversion',
            'Metadata Management',
            'Data Standardization'
        ],
        benefits: [
            'Reliable and accurate data',
            'Improved data accessibility',
            'Reduced data redundancy',
            'Compliance with standards'
        ],
        applications: ['Data Integration', 'Legacy System Migration', 'Multi-source Data', 'Data Warehousing'],
        technologies: ['PostgreSQL', 'SQL Server', 'FME', 'ArcGIS Data Interoperability'],
        isActive: true
    }
];

async function seedServices() {
    try {
        // Clear existing services
        await ProfessionalService.deleteMany({});
        console.log('Cleared existing services');

        // Insert new services
        const result = await ProfessionalService.insertMany(services);
        console.log(`Successfully added ${result.length} professional services`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
}

seedServices();
