const roles = {
    guest: 'GUEST',
    author: 'AUTHOR',
    reviewer: 'REVIEWER',
    editor: 'EDITOR'
}

module.exports.checkAuthorization = (req, role) => {
    let userRole = req.user.role;
    switch(userRole) {
        case roles.editor:
            return true;
        case roles.reviewer:
            if (role !== roles.editor) return true;
            else return false;
        case roles.author:
            if (role !== roles.editor || role !== roles.reviewer) return true;
            else return false;
        case roles.guest:
            if (role === roles.guest) return true;
            else return false;
        default: 
            return false;
    }
}

module.exports.roles = roles;