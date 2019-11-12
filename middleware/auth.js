module.exports = function(req, res, next) {
    if (res.session.isAuthenticated) {
        return res.redirect('/auth/login')
    }
    
    next()
} 