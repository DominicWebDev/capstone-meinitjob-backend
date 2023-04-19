const CompaniesService = require("./companies-service");

const getAllCompanies = (request, response) =>
  CompaniesService.find()
    .then((companies) => response.status(200).json({ companies }))
    .catch((error) => {
      console.log("Fehler beim Erhalten von aller Unternehmen. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von aller Unternehmen.",
      });
    });

const getCompanySkillsByCompanyId = (request, response) => {
  const { id } = request.params;

  CompaniesService.findCompanySkillsByCompanyId(id)
    .then((skills) => {
      console.log(skills, "ControllerSKillsOutPut");
      response.status(200).json({ skills });
    })
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Unternehmen Skills. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von allen Unternehmen Skills.",
      });
    });
};

const getCompanyById = (request, response) => {
  const { id } = request.params;

  if (id) {
    CompaniesService.findById(id)
      .then((company) => {
        company
          ? response.status(200).json({ company })
          : response
              .status(404)
              .json({ message: "Dieses Unternehmen wurde nicht gefunden." });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Unternehmen. ", error);
        return response.status(500).json({
          message: "Fehler beim Erhalten von diesem Unternehmen.",
        });
      });
  } else {
    return response.status(400).json({
      message:
        "Fehler beim Erhalten von diesem Unternehmen, da Angaben fehlen.",
    });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  getCompanySkillsByCompanyId,
};
