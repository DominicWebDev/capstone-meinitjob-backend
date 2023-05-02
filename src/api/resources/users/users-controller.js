const UsersService = require("./users-service");

const getAllUsers = (request, response) =>
  UsersService.find()
    .then((users) => response.status(200).json({ users }))
    .catch((error) => {
      console.log("Fehler beim Erhalten von aller Nutzer. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von aller Nutzer.",
      });
    });

const addUser = (request, response) => {
  const userDTO = ({ first_name, last_name, email, image } = request.body);

  if (first_name && last_name && email) {
    /* userDTO.user_photo = `https://source.boringavatars.com/beam/300/${_user_id}${_user_id}${_user_id}?colors=2f70e9,e76f51,ffc638,f4a261,e97c2f`; */

    UsersService.add(userDTO)
      .then(({ id, first_name, last_name, email, created_at, updated_at }) =>
        response.status(201).json({
          id,
          email,
          first_name,
          last_name,
          created_at,
          updated_at,
        })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Nutzer. ", error);
        return response.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Nutzer.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Hinzufügen von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const updateUser = (request, response) => {
  const updateUserDTO = ({
    first_name,
    last_name,
    email,
    image,
    pref_remote,
    pref_company_size,
    pref_sector,
    description,
  } = request.body);
  console.log(request.body, "KannIchGucken");
  if (
    request.body.id &&
    (first_name ||
      last_name ||
      email ||
      image ||
      pref_remote ||
      pref_company_size ||
      pref_sector ||
      description)
  ) {
    UsersService.update(request.body.id, updateUserDTO)
      .then((successFlag) =>
        successFlag // evtl > 0
          ? response
              .status(200)
              .json({ message: "Der Nutzer wurde aktualisiert." })
          : response.status(500).json({
              message:
                "Fehler bei der Aktualisierung des Nutzers, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler bei der Aktualisierung des Nutzers. ", error);
        return response.status(500).json({
          message: "Fehler bei der Aktualisierung des Nutzers.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler bei der Aktualisierung des Nutzers, da Angaben fehlen.",
    });
  }
};

const getUserById = (request, response) => {
  const { id } = request.params;

  if (id) {
    UsersService.findById(id)
      .then((user) => {
        user
          ? response.status(200).json({ user })
          : response
              .status(404)
              .json({ message: "Dieser Nutzer wurde nicht gefunden." });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Nutzer. ", error);
        return response.status(500).json({
          message: "Fehler beim Erhalten von diesem Nutzer.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.",
    });
  }
};
const getUserByEmail = (request, response) => {
  const { email } = request.params;
  console.log(email, "Hier ist die email");
  if (email) {
    UsersService.findByEmail(email)
      .then((user) => {
        user
          ? response.status(200).json({ user })
          : response
              .status(404)
              .json({ message: "Dieser Nutzer wurde nicht gefunden." });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Nutzer. ", error);
        return response.status(500).json({
          message: "Fehler beim Erhalten von diesem Nutzer.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const getUserSkillsByUserId = (request, response) => {
  const { id } = request.params;

  UsersService.findUserSkillsByUserId(id)
    .then((skills) => {
      console.log(skills, "ControllerSKillsOutPut");
      response.status(200).json({ skills });
    })
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Skills. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von allen Skills.",
      });
    });
};

const addUserSkillByUserId = (request, response) => {
  const userSkillDTO = ({ fk_user_id, fk_skill_id } = request.body);

  if (fk_user_id && fk_skill_id) {
    UsersService.addUserSkill(userSkillDTO)
      .then(({ id, fk_user_id, fk_skill_id, created_at, updated_at }) =>
        response.status(201).json({
          id,
          fk_user_id,
          fk_skill_id,
          created_at,
          updated_at,
        })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Nutzer Skill. ", error);
        return response.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Nutzer Skill.",
        });
      });
  } else {
    return response.status(400).json({
      message:
        "Fehler beim Hinzufügen von diesem Nutzer Skill, da Angaben fehlen.",
    });
  }
};

const updateUserSkill = (request, response) => {
  console.log("updateUserSkill request.body.id", request.body.id);
  console.log("updateUserSkill request.body.name", request.body.name);
  console.log("updateUserSkill request.body.level", request.body.level);

  if (request.body.id && request.body.name && request.body.level) {
    UsersService.updateUserSkill(
      request.body.id,
      request.body.name,
      request.body.level
    )
      .then((successFlag) =>
        successFlag
          ? response
              .status(200)
              .json({ message: "Der Nutzerskill wurde aktualisiert." })
          : response.status(500).json({
              message:
                "Fehler bei der Aktualisierung des Nutzerskills, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler bei der Aktualisierung des Nutzerskills. ", error);
        return response.status(500).json({
          message: "Fehler bei der Aktualisierung des Nutzerskills.",
        });
      });
  } else {
    return response.status(400).json({
      message:
        "Fehler bei der Aktualisierung des Nutzerskills, da Angaben fehlen.",
    });
  }
};

const deleteUserSkill = (request, response) => {
  const userSkillDTO = ({ user_id, skill_id } = request.params);

  if (user_id && skill_id) {
    UsersService.deleteUserSkill(userSkillDTO)
      .then((numberOfDeletedSkills) =>
        numberOfDeletedSkills
          ? response.status(200).json({ message: "Der Skill wurde gelöscht." })
          : response.status(500).json({
              message:
                "Fehler beim Löschen des Skills, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler beim Löschen des Skills. ", error);
        return response.status(500).json({
          message: "Fehler beim Löschen des Skills.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Löschen des Skills, da Angaben fehlen.",
    });
  }
};

const getMatchesByUserId = (request, response) => {
  const { user_id } = request.params;

  UsersService.findMatchesByUserId(user_id)
    .then((matches) => response.status(200).json({ matches }))
    .catch((error) => {
      console.log(
        "Fehler beim Erhalten von aller Matches des Nutzers. ",
        error
      );
      return response.status(500).json({
        message: "Fehler beim Erhalten von aller Matches des Nutzers.",
      });
    });
};

const addMatch = (request, response) => {
  const matchDTO = ({ fk_user_id, fk_company_id } = request.body);

  if (fk_user_id && fk_company_id) {
    UsersService.addMatch(matchDTO)
      .then(
        ({
          id,
          fk_user_id,
          fk_company_id,
          match_status,
          created_at,
          updated_at,
        }) =>
          response.status(201).json({
            id,
            fk_user_id,
            fk_company_id,
            match_status,
            created_at,
            updated_at,
          })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Match. ", error);
        return response.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Match.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Hinzufügen von diesem Match, da Angaben fehlen.",
    });
  }
};

const updateMatch = (request, response) => {
  const updateMatchDTO = ({ match_status } = request.body);
  console.log(request.body, "KannIchGucken");

  if (
    request.body.id &&
    (match_status === "accepted" || match_status === "ignored")
  ) {
    UsersService.updateMatch(request.body.id, updateMatchDTO)
      .then((successFlag) =>
        successFlag // evtl > 0
          ? response
              .status(200)
              .json({ message: "Das Match wurde aktualisiert." })
          : response.status(500).json({
              message:
                "Fehler bei der Aktualisierung des Matches, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler bei der Aktualisierung des Matches. ", error);
        return response.status(500).json({
          message: "Fehler bei der Aktualisierung des Matches.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler bei der Aktualisierung des Matches, da Angaben fehlen.",
    });
  }
};

const deleteMatch = (request, response) => {
  const { id } = request.params;

  if (id) {
    UsersService.deleteMatch(id)
      .then((numberOfDeletedMatches) =>
        numberOfDeletedMatches
          ? response.status(200).json({ message: "Das Match wurde gelöscht." })
          : response.status(500).json({
              message:
                "Fehler beim Löschen des Matches, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler beim Löschen des Matches. ", error);
        return response.status(500).json({
          message: "Fehler beim Löschen des Matches.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Löschen des Matches, da Angaben fehlen.",
    });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  getUserById,
  getUserSkillsByUserId,
  addUserSkillByUserId,
  updateUserSkill,
  deleteUserSkill,
  getMatchesByUserId,
  addMatch,
  updateMatch,
  deleteMatch,
  getUserByEmail,
};
