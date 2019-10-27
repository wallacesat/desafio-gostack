import fs from 'fs';
import { promisify } from 'util';
import File from '../models/File';

const unlinkAsync = promisify(fs.unlink);

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path, path: destination } = req.file;

    const file = await File.create({
      user_id: req.userId,
      name,
      path,
      destination,
    });

    return res.json(file);
  }

  async update(req, res) {
    const {
      originalname: name,
      filename: path,
      path: newDestination,
    } = req.file;

    const ownFile = await File.findByPk(req.params.id);

    if (!ownFile) {
      return res.status(403).json({
        error: 'Arquivo não encontrado',
      });
    }

    if (ownFile.user_id !== req.userId) {
      return res.status(400).json({
        error: `Você não tem permissão para alterar esse arquivo`,
      });
    }

    ownFile.name = name;
    ownFile.path = path;

    const { destination } = ownFile;

    ownFile.destination = newDestination;

    const resultSave = await ownFile.save();

    if (resultSave) {
      await unlinkAsync(destination);
    } else {
      return res.status(500).json({
        error: `Ocorreu um erro interno`,
      });
    }

    return res.json(ownFile);
  }
}

export default new FileController();
