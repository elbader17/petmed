<script setup>
import SeparadorContenido from './icons/SeparadorContenido.vue';

const emit = defineEmits(['abrirModal'])
</script>

<template>
  <div class="modal-tyc">
    <div class="modal-inner">
      <button @click="emit('abrirModal')">
        <font-awesome-icon icon="fa-solid fa-x" size="lg" />
      </button>
      <div class="modal-content">
        <h1 class="content-title">Condiciones generales para el afiliado</h1>
        <p><strong>PETMED</strong> (Medicina Prepaga para Mascotas) presta al afiliado un servicio de cobertura económica
          y
          bonificaciones sobre la atención medica veterinaria y prestaciones afines a través de las veterinarias, médicos
          veterinarios y comercios asociados a aquella bajo el sistema de modalidad prepaga.</p>
        <p><strong>Identificación:</strong> Los planes de PETMED son intransferibles y solo cubrirán a la mascota
          referenciada en la afiliación, siendo obligatoria su identificación mediante la credencial emitida al momento de
          la contratación del servicio. Cada afiliado recibirá, una vez aprobada la Solicitud de Afiliación, una
          credencial
          individual definitiva la cual deberá ser presentada cada vez que se requiera la utilización de los servicios y
          prestaciones incluidas en el plan de salud contratado. El uso indebido de la credencial facultará a PETMED a
          realizar las acciones legales que considere pertinentes. En caso de hurto, robo o pérdida, el afiliado tiene la
          obligación de notificar tal circunstancia a PETMED dentro de las cuarenta y ocho (48) horas de ocurrido tal
          supuesto. Caso contrario, será responsable de las consecuencias producidas por el uso indebido de esta
          credencial
          por parte de terceros.</p>
        <p><strong>Duración:</strong> El servicio prestado por PETMED al Afiliado tiene una duración anual, prorrogándose
          tácitamente si no existe notificación en sentido contrario por ninguna de las partes con al menos 30 días de
          anticipación y por medio fehaciente.</p>
        <p><strong>Información:</strong> Los datos brindados por el afiliado, tanto propios como los de su mascota, forman
          parte de un banco de datos de PETMED y actúan en carácter de declaración jurada. El afiliado se responsabiliza
          por
          la exactitud y veracidad de los mismos, quien acepta las presentes Condiciones Generales y las condiciones
          específicas del plan elegido libremente. La información contenida en la presente será tratada en carácter
          confidencial y únicamente en relación a los servicios brindados por PETMED. Ingreso: Control previo –
          Declaración
          Jurada de salud del animal. Una vez firmada la Solicitud de Afiliación y/o completado el formulario online, y
          previo a la aceptación de la misma por parte de PETMED, la mascota perteneciente al solicitante podrá ser
          examinada por un veterinario asociado a PETMED quien evaluará el estado general de ingreso al servicio. La
          emisión
          de credencial significara la aceptación de la solicitud. En caso de enfermedades preexistentes o de mascotas
          mayores a 8 años, no se considerará aceptada hasta que no se manifieste conformidad con el valor de la cuota
          diferencial correspondiente.</p>
        <p><strong>Exclusiones de cobertura:</strong> PETMED no cubre en ninguno de sus planes: INYECTABLES, ANESTESIA,
          CIRUGIAS ESTETICAS Y DESCARTABLES. PETMED se reserva el derecho de ampliar las exclusiones de cobertura cuando
          existiera alguna circunstancia especial que tornara excesivamente onerosa alguna prestación y generase un
          desequilibrio contractual. Además de las prestaciones que se definen como no cubiertas en este reglamento,
          PETMED
          no asume obligación alguna de coberturas respecto de las situaciones que se detallan seguidamente, las que
          quedan
          excluidas de la cobertura médica contratada y los gastos que éstas demanden estarán a cargo del afiliado. En
          consecuencia, quedan expresamente excluidas de la cobertura de PETMED las prestaciones que tengan y/o hayan
          tenido
          relación con negligencia y/o maltrato.</p>
        <p><strong>Cuota mensual:</strong> El valor de la cobertura se deberá abonar a través del pago mensual de la cuota
          establecida para cada plan de salud. Dichos pagos se deberán hacer por mes adelantado. En la solicitud de pago
          se
          podrá observar un detalle de cuotas, bonificaciones, recargos (si correspondiera). La factura vence
          indefectiblemente en la fecha consignada como vencimiento que se detalla en la solicitud de pago. La falta de
          recepción de la Solicitud de pago del mes en curso, no exime al afiliado de la obligación de pagar en término.
          La
          cuota se considera por mes calendario no resultando proporcionable por ninguna circunstancia en función de la
          fecha de alta o baja del afiliado.</p>
        <p><strong>Aumento de cuota:</strong> PETMED se reserva el derecho de modificar el valor de las cuotas mensuales
          de
          sus Planes, sin afectar el equilibrio contractual.</p>
        <p><strong>Suspensión del servicio / Rescisión del contrato:</strong> Los beneficios sobre las consultas
          veterinarias que se cubren en los distintos planes NO resultan acumulativas durante el año calendario. PETMED
          está
          facultada a rescindir el contrato en caso de falta de pago de tres (3) cuotas íntegras y consecutivas,
          falseamiento de la Declaración Jurada y uso de los servicios en forma injustificada, inadecuada o abusiva, que
          configuren mala fé contractual por parte del afiliado.</p>
        <p><strong>Tiempos de espera:</strong> Con excepción de las consultas en clínica, la totalidad de las prestaciones
          que forman parte de los planes de salud brindados por PETMED cuentan con carencia o tiempo de espera, el cual el
          afiliado debe cumplir para poder acceder a la prestación; dicha información será brindada por PETMED en el
          momento
          de la afiliación.</p>
        <p><strong>Autorizaciones y topes:</strong> PETMED ser reserva el derecho de autorizar y establecer topes de
          cobertura en prácticas las cuales serán detalladas al momento de la afiliación. Asimismo, PETMED se reserva el
          derecho de auditar las mismas con el fin de establecer la real necesidad de acceso por parte del afiliado.</p>
        <p><strong>Mora:</strong> La falta de pago de una cuota mensual en el transcurso de los 5 días desde la fecha de
          vencimiento implicara la reducción del servicio, y la deshabilitación del mismo una vez transcurrido el mes en
          curso si no se regulariza la situación.</p>
        <p><strong>Solicitud de baja:</strong> El afiliado responsable podrá rescindir en cualquier momento el contrato
          sin
          penalidad alguna, debiendo a dichos efectos notificar fehacientemente dicha decisión a PETMED con un periodo no
          menor a treinta (30) días de anticipación. La solicitud de baja deberá ser presentada por escrito, completando
          el
          formulario correspondiente y anexando las credenciales otorgadas al momento de la afiliación. Si existieran
          deudas, la renuncia del titular responsable no extinguirá dichas obligaciones. Los Planes entrarán en vigencia a
          partir de la acreditación del pago de la primera facturación.</p>
        <p><strong>Cambio de plan:</strong> Cada solicitud de cambio de plan será sometida a consideración de PETMED. El
          mínimo de permanencia, en caso que decidiera bajar de plan, es un año (1). Cuando se opte por ascender un plan
          no
          habrá tiempo de espera para acceder a prestaciones del plan superior salvo en prestaciones que estipulen en la
          cartilla determinado plazo. La Credencial es el documento que acredita la Afiliación y el plan contratado. Con
          ella puede acceder a todos los centros Veterinarios, Guarderías, Traslado de Mascota, Paseadores de Mascotas y
          Pet
          Shops y afines asociados, que se encuentra en cartilla. Los análisis, exámenes y/o estudios veterinarios que
          resulten necesario para un animal cubierto por PETMED, serán indicados por el Médico Veterinario asociado, de
          acuerdo al Plan contratado.</p>
        <p>PETMED podrá modificar parcialmente la nómina de prestadores asociados. La modificación podrá deberse, entre
          otras causas, al incremento excesivamente oneroso de costos de los servicios, alta y/o baja de tecnología y/o
          prestaciones, extinción del vínculo con el prestador asociado, imposibilidad de contratación y/o renovación de
          contratos, muerte, jubilación, disolución, quiebra, cierre, concurso, liquidación, etc. del prestador, condena
          civil y/o penal por mala praxis profesional, prestación deficiente del servicio y otros motivos suficientemente
          justificados. En caso de controversias las partes se someten al Juzgado de Primera Instancia en lo Civil y
          Comercial N°1 de la ciudad de Rio Cuarto, Provincia de Córdoba, renunciando desde ya a cualquier otro Fuero y/o
          Jurisdicción que pudiere corresponder, inclusive el Federal.</p>
        <SeparadorContenido class="separador-final" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-tyc {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-inner {
  background: #FFF;
  padding: 2rem;
  width: 70%;
  height: 70%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: linear-gradient(rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.97)),
    url('@/assets/img/trama.jpg') center center fixed;
}

button {
  justify-content: flex-end;
  border: none;
  color: #FFFFFF;
  background-color: #9E63C4;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-title {
  justify-content: center;
  color: #FF6438;
  font-weight: 700;
  font-size: 1.5rem;
  padding-bottom: 1rem;
}

p {
  font-weight: 300;
  font-size: 1.125rem;
  padding-top: 0.5rem;
}

.separador-final {
  transform: rotate(180deg) translateY(-2rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 107%;
  height: 3.875rem;
}
</style>