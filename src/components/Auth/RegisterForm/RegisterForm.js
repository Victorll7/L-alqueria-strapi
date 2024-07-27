import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Auth } from "@/api";
import { initialValues, validationSchema } from "./RegisterForm.form";
import styles from "./RegisterForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";

const authCtrl = new Auth();

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues(),
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = async (formValue) => {
    try {
      await authCtrl.register(formValue);
      router.push("/join/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <Form.Input
            name="name"
            type="text"
            placeholder="Nombre y Apellidos"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.inputWrapper}>
          <Form.Input
            name="username"
            type="text"
            placeholder="Usuario"
            autoComplete="username"
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <Form.Input
            name="email"
            type="text"
            placeholder="Correo electrónico"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button
        colorScheme
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </Button>
    </Form>
  );
}
