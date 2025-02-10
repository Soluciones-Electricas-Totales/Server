import Form from '../../models/Form.js';
import Question from '../../models/Question.js';

const deleteFormById = async (req, res) => {
    const { id } = req.params;

    const form = await Form.findById(id);
    console.log(form);

    if (!form) {
        return res.status(404).json({ message: 'Formulario no encontrado.' });
    }

    // Eliminar las preguntas asociadas
    await Question.deleteMany({ _id: { $in: form.questions } });

    await Form.findByIdAndDelete(id);

    res.status(200).json({ form });
};

export default deleteFormById;
