module.exports = {
  basePath: "",

  async redirects() {
    return [
      {
        source: "/preview/cenik/professional_price_list",
        destination: "/profesni/cenik",
        permanent: true,
      },
      {
        source: "/preview/cenik/classic_price_list",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/clanek/professional_workshop___about",
        destination: "/profesni/popis",
        permanent: true,
      },
      {
        source: "/preview/clanek/quick_courses",
        destination: "/klasicke/rychlokurzy",
        permanent: true,
      },
      {
        source: "/preview/clanek/classical_courses",
        destination: "/klasicke/kurzy",
        permanent: true,
      },
      {
        source: "/preview/clanek/professional_courses",
        destination: "/profesni/kurzy",
        permanent: true,
      },
      {
        source: "/preview/kurz/professional_training___280_hours",
        destination: "/profesni/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/professional_training___140_hours",
        destination: "/profesni/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/professional_periodic_training",
        destination: "/profesni/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_am",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_a1",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_a",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_a__without_limits_",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_b",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_c",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_e_c_",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/kurz/group_a_b",
        destination: "/klasicke/cenik",
        permanent: true,
      },
      {
        source: "/preview/terminy/professional_terms",
        destination: "/klasicke/terminy",
        permanent: true,
      },
      {
        source: "/preview/terminy/classic_terms",
        destination: "/profesni/terminy",
        permanent: true,
      },
      {
        source: "/preview/vozidlo/classic_terms",
        destination: "/profesni/terminy",
        permanent: true,
      },
    ];
  },
};
