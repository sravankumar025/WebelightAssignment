import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./styles.css";

function RepoCard({ getData }) {
  const formatTheGivenDate = (dateString) => {
    const getDateFormat = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, getDateFormat);
  };

  const descriptionTrimming = (description, maxLength) => {
    if (description && description.length > maxLength) {
      return description.slice(0, maxLength) + ".....";
    }
    return description;
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ display: "flex", justifyContent: "center" }}
    >
      {getData.map((repo) => (
        <Grid item key={repo.id} xs={12} sm={8}>
          <Card sx={{ display: "flex", height: "100%", boxShadow: 3 }}>
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, margin: "10px" }}
              image={repo.owner.avatar_url}
              alt="Owner Avatar"
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                <Typography variant="h5">{repo.name}</Typography>
                <Typography variant="body1" color="text.primary">
                  {descriptionTrimming(repo.description, 50) ||
                    "No description available."}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Stars: {repo.stargazers_count}&nbsp;&nbsp;
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Issues: {repo.open_issues_count}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ marginTop: "auto" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="right"
                >
                  Last Pushed {formatTheGivenDate(repo.pushed_at)} by{" "}
                  {repo.owner.login}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
export default RepoCard;
