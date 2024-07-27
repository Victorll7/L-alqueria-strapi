import { Form, Input, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Auth } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./LoginForm.form";
import styles from "./LoginForm.module.scss";

const authCtrl = new Auth();

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue);
        login(response.jwt);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
      <Form.Field>
        <label htmlFor="identifier">Correo electrónico o usuario</label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="identifier"
          value={formik.values.identifier}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.identifier && formik.errors.identifier && (
          <p className={styles.error}>{formik.errors.identifier}</p>
        )}
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Contraseña</label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={styles.error}>{formik.errors.password}</p>
        )}
      </Form.Field>
      <Button
        type="submit"
        className={styles.submitButton}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </Form>
  );
}
