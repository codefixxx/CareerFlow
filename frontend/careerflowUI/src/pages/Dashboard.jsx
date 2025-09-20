import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector
} from 'recharts';
import { useLocation } from 'react-router-dom';
import ChartCard from '../components/ChartCard';
import ListCard from '../components/ListCard';


// Colors
const COLORS_LIGHT = ['#FF9AA2', '#FFB347', '#FFDAC1', '#9EE493', '#9EC1CF', '#B28DFF'];
const COLORS_DARK = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const { careerAnalysis } = location.state || {};
  if (!careerAnalysis) {return <p>No careerAnalysis data available</p>}
  // Data transformations
const salaryGrowthData = Object.entries(careerAnalysis.average_salary_growth).map(
  ([year, salary]) => ({ year, salary: Number(salary) })
);

const learningData = Object.entries(careerAnalysis.learning_resources_distribution).map(
  ([k, v]) => ({ name: k, value: Number(v) })
);

const remoteData = Object.entries(careerAnalysis.remote_vs_office_ratio).map(
  ([k, v]) => ({ name: k, value: Number(v) })
);

const companySizeData = Object.entries(careerAnalysis.company_size_distribution).map(
  ([k, v]) => ({ name: k, value: Number(v) })
);

const skillsData = careerAnalysis.top_skills_with_weightage.map((s) => ({
  ...s,
  weightage: Number(s.weightage),
}));







  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const onPieEnter = (_, index) => setActiveIndex(index);

  const chartColors = isDarkMode ? COLORS_DARK : COLORS_LIGHT;

  return (
    <div className="w-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-4 sm:p-8 font-sans transition-colors duration-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-500 dark:text-blue-400">
            Career Dashboard: {careerAnalysis.career_name} 
          </h1>
        </header>

        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-8">
          A comprehensive overview for a {careerAnalysis.career_name} in {careerAnalysis.country} in {careerAnalysis.current_year}.
        </p>

        {/* Main Section */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ChartCard title="Average Salary Growth (Last 5 Years)" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryGrowthData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
                <CartesianGrid stroke={isDarkMode ? "#555" : "#ddd"} strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke={isDarkMode ? "#888" : "#333"} />
                <YAxis stroke={isDarkMode ? "#888" : "#333"} />
                <Tooltip
                  formatter={(v) => v}
                  contentStyle={{ backgroundColor: isDarkMode ? '#333' : '#fff', borderColor: isDarkMode ? '#555' : '#ccc' }}
                  labelStyle={{ color: isDarkMode ? '#ccc' : '#111' }}
                />
                <Legend />
                <Line type="monotone" dataKey="salary" stroke={isDarkMode ? "#8884d8" : "#4a90e2"} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Core Career Metrics">
            <ul className="space-y-3 text-lg">
              <li><b>Avg. Salary ({careerAnalysis.current_year - 1}):</b> {careerAnalysis.average_salary_growth[careerAnalysis.current_year - 1]}</li>
              <li><b>Job Openings ({careerAnalysis.current_year}):</b> {careerAnalysis.job_openings_estimate[careerAnalysis.current_year]}</li>
              <li><b>Future Demand Growth:</b> {careerAnalysis.future_demand_growth_percentage}%</li>
              <li><b>Work-Life Balance Score:</b> {careerAnalysis.work_life_balance_score} / 5</li>
              <li><b>Automation Risk:</b> {careerAnalysis.automation_risk_percentage}%</li>
            </ul>
          </ChartCard>
        </main>

        {/* Secondary Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {/* Top Skills */}
          <ChartCard title="Top Skills by Weightage">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={skillsData}
                  dataKey="weightage"
                  nameKey="skill"
                  outerRadius={80}
                  activeShape={props => <Sector {...props} outerRadius={props.outerRadius + 10} />}
                  label={false}
                  labelLine={false}
                >
                  {skillsData.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ width: 300, height: 60, overflow: 'hidden', fontSize: '12px', marginTop: '10px' }}
                  formatter={(value) => (value.length > 12 ? value.substring(0, 12) + '…' : value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Learning Resources */}
          <ChartCard title="Learning Resources Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={learningData}>
                <CartesianGrid stroke={isDarkMode ? "#555" : "#ddd"} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={isDarkMode ? "#888" : "#333"} />
                <YAxis stroke={isDarkMode ? "#888" : "#333"} />
                <Tooltip
                  formatter={(value) => value}
                  contentStyle={{ backgroundColor: isDarkMode ? '#333' : '#fff', borderColor: isDarkMode ? '#555' : '#ccc' }}
                  labelStyle={{ color: isDarkMode ? '#ccc' : '#111' }}
                />
                <Bar dataKey="value" fill={isDarkMode ? '#4BC0C0' : '#9EE493'} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Remote vs Office */}
          <ChartCard title="Remote vs Office Ratio">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={remoteData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  activeShape={props => <Sector {...props} outerRadius={props.outerRadius + 10} />}
                  labelLine={false}
                  label={false}
                >
                  {remoteData.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Company Size */}
          <ChartCard title="Company Size Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={companySizeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  activeShape={props => <Sector {...props} outerRadius={props.outerRadius + 10} />}
                  labelLine={false}
                  label={false}
                >
                  {companySizeData.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Lists */}
          <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ListCard title="Geographic Opportunities" items={careerAnalysis.geographic_opportunities} />
            <ListCard title="Recommended Certifications" items={careerAnalysis.recommended_certifications} />
            <ListCard title="Emerging Tools & Tech" items={careerAnalysis.emerging_tools_and_tech} />
          </div>
        </section>
      </div>
    </div>
  );
}
