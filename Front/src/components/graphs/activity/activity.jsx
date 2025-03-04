import "./activity.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchUserActivity } from "../../../services/api";

/**
 * Component to display user's daily activity in a bar chart.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.userId - The ID of the user to fetch activity data for
 * @returns {JSX.Element} A bar chart representing the user's daily activity
 */
function Activity({ userId }) {
  const [activityData, setActivityData] = useState(null);

  // Hook : Fetch and set user activity data when userId changes
  useEffect(() => {
    const getActivityData = async () => {
      const data = await fetchUserActivity(userId);
      setActivityData(data.sessions);
    };

    getActivityData();
  }, [userId]);

  if (!activityData) {
    return <div>Veuillez patienter...</div>;
  }

  const formattedData = activityData.map((session) => ({
    ...session,
    day: session.day.slice(-1),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p>{`${payload[0].value} kg`}</p>
          <p>{`${payload[1].value} kcal`}</p>
        </div>
      );
    }

    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      })
    ),
  };

  return (
    <section className="performance_activity">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 50, right: 5, left: 0, bottom: 5 }}
        >
          <text
            x={100}
            y={20}
            fill="black"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: 16, fontWeight: "600" }}
          >
            Activité quotidienne
          </text>
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <XAxis dataKey="day" tickLine={false} stroke="#d3d3d3" />
          <YAxis
            yAxisId="left"
            dataKey="kilogram"
            orientation="right"
            axisLine={false}
            tickLine={false}
            stroke="#d3d3d3"
          />
          <YAxis
            yAxisId="right"
            dataKey="calories"
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 20 }}
          />
          <Bar
            yAxisId="left"
            dataKey="kilogram"
            fill="#282D30"
            name="Poids (kg)"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="right"
            dataKey="calories"
            fill="#E60000"
            name="Calories brûlées (kcal)"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

Activity.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Activity;
