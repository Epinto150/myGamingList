const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/myGamingList_development",
      test: "postgres://postgres:postgres@localhost:5432/myGamingList_test",
      e2e: "postgres://postgres:postgres@localhost:5432/myGamingList_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
