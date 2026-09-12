import {
    aggregateRecord,
    getGrantedPermissions,
    getSdkStatus,
    initialize,
    requestPermission,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';

export async function getTodaySteps(): Promise<number> {
  const sdkStatus = await getSdkStatus();

  if (
    sdkStatus ===
    SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
  ) {
    throw new Error(
      'Health Connect necesita instalarse o actualizarse.'
    );
  }

  if (sdkStatus !== SdkAvailabilityStatus.SDK_AVAILABLE) {
    throw new Error(
      'Health Connect no está disponible en este dispositivo.'
    );
  }

  const initialized = await initialize();

  if (!initialized) {
    throw new Error(
      'No se pudo iniciar Health Connect.'
    );
  }

  let grantedPermissions = await getGrantedPermissions();

    let canReadSteps = grantedPermissions.some(
    permission =>
        permission.accessType === 'read' &&
        permission.recordType === 'Steps'
    );

    if (!canReadSteps) {
        let requestedPermissions  = await requestPermission([
            {
            accessType: 'read',
            recordType: 'Steps',
            },
        ]);

        canReadSteps = requestedPermissions .some(
            permission =>
            permission.accessType === 'read' &&
            permission.recordType === 'Steps'
        );
    }

    if (!canReadSteps) {
    throw new Error(
        'Necesitamos permiso de Health Connect para leer tus pasos.'
    );
    }

  const end = new Date();
  const start = new Date();

  start.setHours(0, 0, 0, 0);

  const result = await aggregateRecord({
    recordType: 'Steps',
    timeRangeFilter: {
      operator: 'between',
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    },
  });

  return result.COUNT_TOTAL ?? 0;
}