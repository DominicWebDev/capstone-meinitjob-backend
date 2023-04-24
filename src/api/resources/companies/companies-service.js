const db = require("../../../database/db");

// get all companies
const find = () => db("companies");

const findById = (id) =>
  db("companies")
    .where({ id })
    .first()
    .then((company) => company ?? null);

const findCompanySkillsByCompanyId = (id) => {
  return db("companies_skills as cs")
    .join("companies as c", "c.id", "cs.fk_company_id")
    .select("cs.fk_skill_id")
    .where("c.id", id)
    .then((companySkills) => {
      console.log(companySkills, "CompanySkills");
      if (!companySkills.length) return null;
      return db("skills").then((skills) => {
        console.log(skills, "all Company Skills Fetched");
        const CompanySkillsWithNames = companySkills.map((companySkill) => {
          const skill = skills.find(
            (skill) => skill.id === companySkill.fk_skill_id
          );
          return {
            ...companySkill,
            skill_name: skill.name,
            skill_level: skill.level,
          };
        });
        console.log(CompanySkillsWithNames, "Company Skills With Names");
        return CompanySkillsWithNames;
      });
    });
};

const findAllCompanySkills = () => db("companies_skills");

module.exports = {
  find,
  findById,
  findCompanySkillsByCompanyId,
  findAllCompanySkills,
};
