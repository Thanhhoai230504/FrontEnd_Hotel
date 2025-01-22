import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { fetchBookingStatistics } from "../../../store/slice/bookingStatistics";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import Loading from "../../../components/Loading";
import Header from "../../../layout/Header/components/Header";
import Footer from "../../../layout/Footer";
import withAdminRoute from "../../../components/hocs/withAdminRoute ";

// Format currency
const formatCurrency = (value: number | null) => {
  if (value === null) return "N/A";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

// Format number with commas
const formatNumber = (value: number | null) => {
  if (value === null) return "N/A";
  return new Intl.NumberFormat("vi-VN").format(value);
};

// Define chart dataset type
type ChartDataItem = {
  [key: string]: string | number | null;
};

const StatCard = ({
  title,
  value,
  subValue,
  extraInfo,
}: {
  title: string;
  value: number;
  subValue: string;
  extraInfo?: { label: string; value: string }[];
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {formatNumber(value)}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {subValue}
      </Typography>
      {extraInfo && (
        <Box sx={{ mt: 2 }}>
          {extraInfo.map((info, index) => (
            <Typography key={index} variant="body2" color="textSecondary">
              {info.label}: {info.value}
            </Typography>
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
);

const BookingStatistics: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(
    (state: RootState) => state.bookingStatisticsState.BookingStatistics
  );
  const loading = useSelector(
    (state: RootState) => state.bookingStatisticsState.loading
  );

  useEffect(() => {
    dispatch(fetchBookingStatistics());
  }, [dispatch]);

  if (loading || !statistics) {
    return <Loading />;
  }

  const chartData: ChartDataItem[] = statistics.dailyStats.map((stat) => ({
    date: stat.date,
    paidBookings: stat.paidBookings,
    pendingBookings: stat.pendingBookings,
    paidRevenue: stat.paidRevenue,
    pendingRevenue: stat.pendingRevenue,
  }));

  const chartSettings = {
    margin: { left: 80, right: 20, top: 20, bottom: 100 },
    slotProps: {
      legend: {
        direction: "row",
        position: {
          vertical: "bottom",
          horizontal: "middle",
        },
        padding: 20,
      },
    },
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 3, mt: 12 }}>
        <Typography variant="h4" gutterBottom>
          Thống Kê Đặt Chỗ
        </Typography>

        {/* Thẻ Tóm Tắt */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Đặt Chỗ Hôm Nay"
              value={statistics.today.totalBookings}
              subValue={formatCurrency(statistics.today.totalRevenue)}
              extraInfo={[
                {
                  label: "Đã Thanh Toán",
                  value: `${formatNumber(
                    statistics.today.paid.bookings
                  )} (${formatCurrency(statistics.today.paid.revenue)})`,
                },
                {
                  label: "Chưa Thanh Toán",
                  value: `${formatNumber(
                    statistics.today.pending.bookings
                  )} (${formatCurrency(statistics.today.pending.revenue)})`,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Đặt Chỗ Trong Tuần"
              value={statistics.thisWeek.totalBookings}
              subValue={formatCurrency(statistics.thisWeek.totalRevenue)}
              extraInfo={[
                {
                  label: "Đã Thanh Toán",
                  value: `${formatNumber(
                    statistics.thisWeek.paid.bookings
                  )} (${formatCurrency(statistics.thisWeek.paid.revenue)})`,
                },
                {
                  label: "Chưa Thanh Toán",
                  value: `${formatNumber(
                    statistics.thisWeek.pending.bookings
                  )} (${formatCurrency(statistics.thisWeek.pending.revenue)})`,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Đặt Chỗ Trong Tháng"
              value={statistics.thisMonth.totalBookings}
              subValue={formatCurrency(statistics.thisMonth.totalRevenue)}
              extraInfo={[
                {
                  label: "Đã Thanh Toán",
                  value: `${formatNumber(
                    statistics.thisMonth.paid.bookings
                  )} (${formatCurrency(statistics.thisMonth.paid.revenue)})`,
                },
                {
                  label: "Chưa Thanh Toán",
                  value: `${formatNumber(
                    statistics.thisMonth.pending.bookings
                  )} (${formatCurrency(statistics.thisMonth.pending.revenue)})`,
                },
              ]}
            />
          </Grid>
        </Grid>

        {/* Biểu Đồ */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Đặt Chỗ Hàng Ngày Theo Trạng Thái Thanh Toán
                </Typography>
                <Box sx={{ height: 400 }}>
                  <BarChart
                    dataset={chartData}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "date",
                        valueFormatter: formatDate,
                        tickLabelStyle: {
                          angle: 45,
                          textAnchor: "start",
                          fontSize: 12,
                        },
                      },
                    ]}
                    yAxis={[
                      {
                        tickLabelStyle: {
                          fontSize: 12,
                        },
                        valueFormatter: formatNumber,
                      },
                    ]}
                    series={[
                      {
                        dataKey: "paidBookings",
                        label: "Đặt Chỗ Đã Thanh Toán",
                        color: theme.palette.success.main,
                        valueFormatter: formatNumber,
                      },
                      {
                        dataKey: "pendingBookings",
                        label: "Đặt Chỗ Chưa Thanh Toán",
                        color: theme.palette.warning.main,
                        valueFormatter: formatNumber,
                      },
                    ]}
                    height={400}
                    margin={chartSettings.margin}
                    sx={{
                      ".MuiChartsLegend-root": {
                        paddingTop: 2,
                        paddingBottom: 2,
                      },
                    }}
                    legend={{
                      direction: "row",
                      position: { vertical: "bottom", horizontal: "middle" },
                      padding: 20,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Doanh Thu Hàng Ngày Theo Trạng Thái Thanh Toán
                </Typography>
                <Box sx={{ height: 400 }}>
                  <LineChart
                    dataset={chartData}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "date",
                        valueFormatter: formatDate,
                        tickLabelStyle: {
                          angle: 45,
                          textAnchor: "start",
                          fontSize: 12,
                        },
                      },
                    ]}
                    yAxis={[
                      {
                        tickLabelStyle: {
                          fontSize: 12,
                        },
                        valueFormatter: formatCurrency,
                      },
                    ]}
                    series={[
                      {
                        dataKey: "paidRevenue",
                        label: "Doanh Thu Đã Thanh Toán",
                        color: theme.palette.success.main,
                        valueFormatter: formatCurrency,
                      },
                      {
                        dataKey: "pendingRevenue",
                        label: "Doanh Thu Chưa Thanh Toán",
                        color: theme.palette.warning.main,
                        valueFormatter: formatCurrency,
                      },
                    ]}
                    height={400}
                    margin={chartSettings.margin}
                    sx={{
                      ".MuiChartsLegend-root": {
                        paddingTop: 2,
                        paddingBottom: 2,
                      },
                    }}
                    legend={{
                      direction: "row",
                      position: { vertical: "bottom", horizontal: "middle" },
                      padding: 20,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
};

export default withAdminRoute(BookingStatistics);
