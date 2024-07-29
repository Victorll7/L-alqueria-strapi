import { useState, useEffect } from "react";
import { map } from "lodash";
import classNames from "classnames";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { Button } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import { AddressForm } from "@/components/Account/Address/AddressForm";
import styles from "./Addresses.module.scss";

const addressCtrl = new Address();

export function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user.id]); // Agregar user.id como dependencia para recargar direcciones cuando cambia el usuario

  const handleAddAddress = () => {
    setShowAddAddressModal(true);
  };

  const handleAddAddressModalClose = () => {
    setShowAddAddressModal(false);
  };

  const reloadAddresses = async () => {
    try {
      const response = await addressCtrl.getAll(user.id);
      setAddresses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.addresses}>
      <h2>Dirección</h2>

      {addresses && addresses.length > 0 ? (
        // Mostrar direcciones existentes si las hay
        <>
          {map(addresses, (address) => (
            <div
              key={address.id}
              onClick={() => setAddressSelected(address)}
              className={classNames(styles.address, {
                [styles.active]: address.id === addressSelected?.id,
              })}
            >
              <p>
                {address.attributes.name} ({address.attributes.title})
              </p>
              <p>
                {address.attributes.address}, {address.attributes.postal_code},{" "}
                {address.attributes.state}, {address.attributes.city}
              </p>
            </div>
          ))}
        </>
      ) : (
        // Si no hay direcciones, mostrar opción para agregar una nueva
        <p>No tienes ninguna dirección creada.</p>
      )}

      <Button primary className={styles.addBtn} onClick={handleAddAddress}>
        Crear Nueva Dirección
      </Button>

      <BasicModal
        show={showAddAddressModal}
        onClose={handleAddAddressModalClose}
        title="Nueva dirección"
      >
        <AddressForm
          onClose={handleAddAddressModalClose}
          onReload={reloadAddresses}
        />
      </BasicModal>
    </div>
  );
}
