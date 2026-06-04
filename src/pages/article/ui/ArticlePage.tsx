import { useParams, Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { articleData } from "../../../entities/article";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articleData.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/" replace />;

  return (
    <Box sx={{ color: "white" }}>
      <Box
        component="img"
        src={article.image}
        alt={article.title}
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "block",
          mx: "auto",
          mb: 3,
          borderRadius: 1,
        }}
      />
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        {article.title}
      </Typography>
      <Typography sx={{ color: "lightgray", lineHeight: 1.8, fontSize: "1.05em" }}>
        {article.text}
      </Typography>
    </Box>
  );
}
