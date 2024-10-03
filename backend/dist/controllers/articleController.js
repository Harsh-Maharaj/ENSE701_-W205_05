export const someFunction = async (req, res) => {
    try {
        // Your logic here
    }
    catch (error) {
        // Corrected catch block
        res.status(500).json({ message: error.message });
    }
};
