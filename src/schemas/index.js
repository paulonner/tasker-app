import * as Yup from 'yup'
import { getDuration } from '../helpers'

const requiredText = 'Este campo es requerido'
const maxDuration = getDuration({ duration: '02:00', type: 'milliseconds' })

export const validationTask = Yup.object().shape({
  name: Yup.string()
    .required(requiredText)
    .max(100, 'Por favor ingrese no más de ${max} caracteres'),
  duration: Yup.string()
    .required(requiredText)
    .matches(/([01]?[0-9]|2[0-3]):[0-5][0-9]/, 'Ingresa formato válido, ejem: 00:30, 02:00')
    .test('duration', 'La duración no puede exceder más de 2:00 hrs', value => {
      return getDuration({ duration: value, type: 'milliseconds' }) <= maxDuration
    })
})