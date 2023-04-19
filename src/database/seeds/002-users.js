exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          first_name: "Dominic",
          last_name: "Matte",
          email: "mattedominic@gmx.de",
          image:
            "https://source.boringavatars.com/beam/300/333?colors=2f70e9,e76f51,ffc638,f4a261,e97c2f",
          pref_company_size: 2500000,
          pref_sector: "Software",
          pref_remote: true,
          description:
            "Mir ist bewusst, dass jeder neue Stapel auf dem Technologie-Stack auch einen Mehrwert für den Einsatz im Unternehmen bieten muss und nicht nur aus theoretischer Sicht überzeugen darf.",
        },
      ]);
    });
};
