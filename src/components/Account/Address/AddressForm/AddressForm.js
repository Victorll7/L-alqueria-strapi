import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./AddressForm.form";

const addressCtrl = new Address();

export function AddressForm(props) {
  const { onClose, onReload, addressId, address } = props;
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          await addressCtrl.update(formValue, addressId);
        } else {
          await addressCtrl.create(formValue, user.id);
        }

        formik.resetForm(); // Resetear el formulario después de enviar
        onReload(); // Recargar la lista de direcciones

        // Mostrar SweetAlert de creación exitosa
        Swal.fire({
          icon: "success",
          title: "¡Dirección creada!",
          text: "La dirección se ha creado exitosamente.",
          confirmButtonText: "Aceptar",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          onClose(); // Cerrar el modal después de aceptar el SweetAlert
        });
      } catch (error) {
        console.error(error);

        // Mostrar SweetAlert de error si es necesario
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al crear la dirección. Por favor, intenta nuevamente.",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Apartamento, Chalet, etc..."
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          placeholder="Nombre y apellidos"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          placeholder="Dirección"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="state"
          placeholder="Provincia"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.errors.state}
        />
        <Form.Input
          name="city"
          placeholder="Ciudad"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.errors.city}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postal_code"
          placeholder="Codigo postal"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          error={formik.errors.postal_code}
        />
        <Form.Input
          name="phone"
          placeholder="Telefono"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
