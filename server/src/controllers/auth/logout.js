const logoutController = async (req, res) => {
    try {

        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
        })
        return res.status(200).json({ data: true });
    } catch (error) {
        res.status(401).json({ error: "Internal Server Error" });
    }
};

export default logoutController;