import dotenv from 'dotenv';

const politicaTratamientoDatos = async (req, res) => {
    dotenv.config();

    try {
        const htmlStyle = `
            <style>
                
            </style>
        `

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mi Página</title>
            ${htmlStyle}
        </head>
        <body>
            
            <h1>Política de tratamiento de datos personales</h1>
            <ol>
                <li>
                    <h2>Propósito</h2>
                    La presente política de tratamiento de datos personales es elaborada de conformidad con lo dispuesto en la Constitución Política, la Ley 1581 de 2012, el Decreto Reglamentario 1377 de 2013 y demás disposiciones complementarias y será aplicada por CORPORACIÓN ECOCARGA COLOMBIA. respecto de la recolección, almacenamiento, uso, circulación, supresión y cualquier conjunto de operaciones que constituyan tratamiento de datos personales.
                </li>
                <li>
                    <h2>Responsable del Tratamiento</h2>
                    Responsable del tratamiento: EcoCarga Correo electrónico: juanescs08@gmail.com .
                </li>
                <li>
                    <h2>Definiciones</h2>
                    Para los fines y efectos de la presente política y de conformidad con la normatividad legal, los términos con mayúscula inicial indicados a continuación tendrán el siguiente significado:
Autorización: Consentimiento previo, expreso e informado del Titular para llevar a cabo el Tratamiento de datos personales.
Aviso de privacidad: Comunicación verbal o escrita generada por el responsable, dirigida al Titular para el Tratamiento de sus Datos Personales. En el Aviso de Privacidad se comunica al Titular la información relativa a la existencia de la Política, la forma de acceder a la misma y las finalidades del Tratamiento que se pretende dar a los Datos Personales.
Base de datos: Conjunto organizado de Datos Personales que sea objeto de Tratamiento. Las Bases de Datos podrán ser física, electrónica y de cualquier medio habido o por haber.
Causahabiente: Persona que ha sucedido a otra por causa del fallecimiento de ésta (heredero) testamentario o legítimo.
Contrato de transmisión: Contrato que suscriba el responsable con los eventuales Encargados para el Tratamiento de Datos Personales bajo su control y responsabilidad que señalará los alcances del Tratamiento, las actividades que el eventual Encargado realizará por cuenta del responsable, la finalidad del Tratamiento y las obligaciones del Encargado con el Titular y el responsable.
Dato Personal: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.
Dato público: Es el dato calificado como tal según los mandatos de la ley o de la Constitución Política y aquel que no sea semiprivado, privado o sensible. Son públicos, entre otros, los datos relativos al estado civil de las personas, a su profesión u oficio, a su calidad de comerciante o de servidor público y aquellos que puedan obtenerse sin reserva alguna. Por su naturaleza, los datos públicos pueden estar contenidos, entre otros, en registros públicos, documentos públicos, gacetas y boletines oficiales.
Dato privado: Es el dato que por su naturaleza íntima o reservada sólo es relevante para el Titular.
Dato semiprivado: Dato que no tiene naturaleza intima, reservada, ni pública y cuyo conocimiento o divulgación puede interesar no sólo a su titular sino a cierto sector o grupo de personas o a la sociedad en general, como el dato financiero y crediticio de actividad comercial o de servicios.
Dato sensible: Se entiende por datos sensibles aquellos que afectan la  intimidad del Titular o cuyo uso indebido puede generar  su discriminación, tales como aquellos que revelen el  origen racial o étnico, la orientación política, las  convicciones religiosas o filosóficas, la pertenencia a  sindicatos, organizaciones sociales, de derechos  humanos o que promueva intereses de cualquier partido  político o que garanticen los derechos y garantías de  partidos políticos de oposición, así como los datos  relativos a la salud, a la vida sexual y los datos  biométricos.
Encargado: Persona, natural o jurídica, que por sí misma o en asocio con otros, realice el Tratamiento de Datos Personales por cuenta del responsable.
Personas autorizadas: Las personas que podrán ejercer los derechos del Titular, las cuales se listan en el Artículo 8, numeral 8.3 de la presente Política.
Política: La presente Política.
Responsable o EcoCarga: Corporación EcoCarga Colombia. entidad que por sí misma o en asocio con otros, decida sobre la Base de Datos y/o el Tratamiento.
SIC: Superintendencia de Industria y Comercio.
Titular: Persona natural cuyos Datos Personales sean objeto de Tratamiento.
Transferencia: La situación en la cual el responsable y/o el eventual Encargado, ubicado en Colombia, envía la información o los Datos Personales a un receptor, que a su vez es Responsable del Tratamiento y se encuentra dentro o fuera del país.
Transmisión: El Tratamiento de Datos Personales que implica la comunicación de los mismos dentro o fuera del territorio colombiano cuando tenga por objeto la realización de un Tratamiento por el Encargado por cuenta del responsable.
Tratamiento: Cualquier operación o conjunto de operaciones sobre Datos Personales, incluyendo, pero sin limitarse a la recolección, almacenamiento, uso, circulación o supresión de los mismos.
Las definiciones contenidas en la presente Política podrán ser usadas tanto en singular como en plural y el género masculino incluirá el femenino y viceversa.

                </li>
                <li>
                    <h2>Ámbito de aplicación</h2>
                    La presente política aplica a todos los datos de personas naturales registrados en cualquiera de nuestras bases de datos, que estén en formato electrónico y que sean susceptibles de tratamiento.
                </li>
                <li>
                    <h2>Directrices de la Política de Tratamiento de Datos Personales.</h2>
                    <ol>
                        <li>Cumplir con la normatividad legal vigente en materia de protección de datos personales. </li>
                        <li>El dato personal sometido a tratamiento deberá ser veraz, completo, exacto, actualizado, comprobable y comprensible. </li>
                        <li>Los datos personales sólo serán tratados por aquellas personas que realicen actividades dentro del marco de las funciones asignadas y que cuenten con los permisos correspondientes. </li>
                        <li>Se debe evaluar la pertinencia de anonimizar los actos administrativos y/o documentos de carácter público que contengan datos personales, para su publicación.</li>
                        <li>EcoCarga garantiza los derechos de los titulares de la información. </li>
                        <li>EcoCarga podrá intercambiar información de Datos Personales con autoridades gubernamentales o públicas tales como autoridades administrativas, de impuestos, organismos de investigación y autoridades judiciales, cuando lo soliciten en ejercicio de sus funciones. </li>
                        <li>Para el tratamiento de los datos personales EcoCarga implementa medidas tecnológicas y humanas para su protección, estableciendo el nivel adecuado de seguridad de forma tal que la información no pueda ser copiada, adulterada, eliminada, consultada o de alguna manera utilizada sin autorización o para uso fraudulento.</li>
                        <li>EcoCarga realiza actividades de divulgación dirigidas a sus funcionarios, contratistas y terceros encargados del tratamiento sobre las obligaciones que tienen en relación con el tratamiento de datos personales. </li>
                        <li>El incumplimiento de las políticas de tratamiento de datos personales acarreará las sanciones consagradas en el Código Único Disciplinario y normas concordantes. </li>
                    </ol>
                </li>
                <li>
                    <h2>Finalidad</h2>
                    La información recolectada por ECOCARGA, incluyendo los Datos Sensibles, será  utilizada para alguna de las siguientes finalidades: (i) desarrollar el objeto social y  la actividad comercial de ECOCARGA y para el cumplimiento de las obligaciones  originadas y derivadas de cualquier relación jurídica y/o comercial que se establece  con el Titular; (ii) ejecutar la relación contractual existente con sus clientes,  proveedores y trabajadores, incluida el pago de obligaciones contractuales; (iii)  ejecutar los derechos y cumplir con los deberes de los socios de ECOCARGA ;(iv)  controlar y prevenir el fraude, la corrupción, el soborno y el lavado de activos y  proteger frente a las trampas, el crimen o para reforzar otro tipo de seguridad; (v)  proveer los servicios y/o los productos requeridos por sus clientes, informar sobre  nuevos productos o servicios y/o sobre cambios en los mismos, o evaluar la calidad de sus productos y/o servicios; (vi) enviar al correo físico, electrónico, celular o  dispositivo móvil, vía mensajes de texto (SMS y/o MMS) o a través de cualquier  otro medio análogo y/o digital de comunicación creado o por crearse, información  comercial, publicitaria, promocional sobre los productos y/o servicios o realizar  estudios de hábitos de consumo, estadísticas, preguntas de atención al cliente; (vii)  desarrollar el proceso de reclutamiento, selección, evaluación y vinculación laboral;  (viii) realizar estudios internos inclusivo sobre hábitos de consumo, compilar estadísticas, responder a preguntas de atención al cliente o realizar procesos de auditoría interna o externa; (ix) registrar la información de empleados y/o pensionados (activos e inactivos) en las Bases de Datos de ECOCARGA; (x) archivar y actualizar los sistemas de protección y custodia de información y Bases de Datos de ECOCARGA; (xi) desarrollar el proceso de contratación de terceros; (xii) suministrar, compartir, enviar o entregar Datos Personales a empresas controlantes, matriz, filiales, vinculadas, o subordinadas ubicadas en Colombia o cualquier otro país en el evento que dichas compañías requieran la información para los fines aquí indicados; y (xiii) cumplir con las disposiciones constitucionales, legales y reglamentarias previstas en el ordenamiento jurídico colombiano. 
Para el caso exclusivo de los eventuales postulantes y empleados, el Tratamiento tiene como finalidad, llevar a cabo el proceso de reclutamiento, selección, pago de nómina y en su caso la contratación y tramitación de las diversas prestaciones laborales y de seguridad social integral aplicables, cumplimiento de políticas internas y aplicabilidad de cobertura de seguro médico indistintamente privado o de seguridad social.
Los Datos Personales proporcionados serán utilizados sólo para los propósitos  aquí señalados, y, por lo tanto, ECOCARGA no procederá a vender, licenciar,  transmitir, o divulgar lo mismo, salvo que: (i) exista autorización expresa para  hacerlo; (ii) sea necesario para permitir a los contratistas o agentes prestar los  servicios encomendados; (iii) sea necesario con el fin de proveer los servicios y/o  productos de ECOCARGA; (iv) sea necesario divulgarla a las entidades que prestan  servicios de mercadeo en nombre de ECOCARGA o a otras entidades con las cuales se tengan acuerdos de mercado conjunto; (v) la información tenga relación  con una fusión, consolidación, adquisición, desinversión, u otro proceso de  restructuración de la sociedad; (vi) que sea requerido por cualquier autoridad o  permitido por la ley. 
Los Datos Personales tratados por EcoCarga deberán someterse únicamente a las finalidades señaladas en esta Política. El Tratamiento podrá tener otras finalidades siempre que estas sean comunicadas al Titular de forma previa a recolección de los Datos Personales. 
La información que consta en las Bases de Datos de EcoCarga será sometida a distintas formas de Tratamiento Manual, como recolección, intercambio, actualización procesamiento, reproducción o compilación, análisis, reporte, circulación, conservación, almacenamiento, uso, sistematización y organización, rectificación y supresión de Datos Personales, todos ellos de forma parcial o total en cumplimiento de las finalidades establecidas en la presente Política. La información podrá ser entregada, transmitida o transferidas a entidades públicas, socios comerciales, contratistas, afiliados, empresas controlantes, matriz, filiales, vinculadas, o subordinadas, únicamente con el fin de cumplir con las finalidades de la Base de Datos correspondiente. 
La recolección de Datos Personales del Titular puede hacerse mediante la entrega directa y/o personal por cualquier medio de contacto físicos o electrónicos entre el Titular y el responsable o su(s) Encargado(s). También puede recolectar Datos Personales de manera indirecta a través de fuentes de acceso público y de otras fuentes disponibles. 

                </li>
                <li>
                    <h2>Autorización para el tratamiento de Datos Personales</h2>
                    Sin perjuicio de las excepciones previstas en la ley, en el Tratamiento se requiere la Autorización previa, expresa e informada del Titular, la cual deberá ser obtenida por cualquier medio que pueda ser objeto de consulta y verificación posterior.  EcoCarga implementará los procedimientos necesarios para solicitar en el momento de la recolección de los datos personales, la autorización para el tratamiento de los mismos y le comunicará al titular los datos personales a tratar, la finalidad, los sitios donde puede consultar la política de tratamiento de datos y los canales de atención de consultas, peticiones y quejas. La Autorización del Titular no será necesaria en los casos establecidos de la normativa aplicable y, entre otros, Datos Públicos, información requerida por una entidad pública o administrativa en ejercicio de sus funciones legales o por orden judicial, datos de naturaleza pública. 
En el evento que los Datos Personales suministrados por el Titular pertenezcan a terceras personas, se entenderá que el Titular está facultado para otorgar dichos datos. El Titular es responsable frente a esos terceros por haber suministrado la información y deberá mantener indemne a EcoCarga de cualquier reclamación. 
Con la utilización del aplicativo de EcoCarga, el Titular manifiesta que ha leído, entendido y acordado los términos de la presente Política, lo que constituye su consentimiento a los cambios y/o actualizaciones respecto al Tratamiento de sus Datos Personales. 

                </li>
                <li>
                    <h2>Derechos de los Titulares de Datos Personales</h2>
                    De conformidad con esta Política y la normativa aplicable, el Titular podrá ejercer los siguientes derechos, respecto de los Datos Personales que sean objeto de Tratamiento por parte de EcoCarga:
                    <ol type="a">
                        <li><strong>Conocer, actualizar y rectificar sus Datos Personales. </strong>Este derecho se podrá ejercer, entre otros, frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado. </li>
                        <li><strong>Solicitar prueba de la autorización otorgada para el Tratamiento, </strong>salvo cuando expresamente se exceptúe como requisito para el Tratamiento. </li>
                        <li><strong>Ser informado </strong>por el responsable o el eventual Encargado, previa solicitud, respecto del uso dado a sus Datos Personales. </li>
                        <li><strong>Presentar ante la SIC</strong> queja por infracciones a lo dispuesto en la presente Política y en la normativa aplicable. El Titular o las Personas Autorizadas sólo podrán elevar quejas ante la SIC una vez haya agotado el trámite de consulta o reclamo establecido en los Artículos 10 y 11 de la presente Política. </li>
                        <li><strong>Revocar </strong>la autorización y/o solicitar la supresión de los Datos Personales cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales, aplicando el procedimiento del sucesivo Artículo 11. La solicitud de supresión y/o la revocatoria de la Autorización no procederán cuando el Titular tenga un deber legal o contractual de permanecer en la Base de Datos. </li>
                        <li><strong>Acceder en forma gratuita a sus Datos Personales </strong>que hayan sido objeto de Tratamiento para el cual deberá enviar solicitud escrita al responsable. </li>
                    </ol>
                    Los derechos del Titular podrán ejercerse por las siguientes personas: (i) por el  Titular, quien deberá acreditar su identidad en forma suficiente; (ii) por los  Causahabientes del Titular, quienes deberán acreditar tal calidad; (iii) por el  representante y/o apoderado del Titular, previa acreditación de la representación  o apoderamiento; (iv) por estipulación a favor de otro o para otro; y (v) en caso de niños, niñas y adolescentes, por las personas que están facultadas para representarlos. 
Los Datos Personales del Titular podrán ser suministrados a las siguientes personas: (i) al Titular, sus Causahabientes o sus representantes legales; (ii) a las entidades públicas o administrativas en ejercicio de sus funciones legales o por orden judicial; y (iii) a los terceros autorizados por el Titular o por la Ley.
La veracidad, autenticidad, vigencia y exactitud de la información que proporcione el Titular o las Personas Autorizadas es responsabilidad del Titular y se compromete a notificar a EcoCarga cualquier cambio que sufra esa información.

                </li>
                <li>
                    <h2>Tratamiento de particulares de datos</h2>
                    El Tratamiento de Datos Sensibles está prohibido excepto en los casos expresamente señalados en la normativa aplicable. Cuando dicho Tratamiento sea  posible conforme a lo establecido en la normativa aplicable, deberá cumplirse en  el respecto de las siguientes obligaciones: (i) informar al Titular que por tratarse  de Datos Sensibles no está obligado a autorizar su Tratamiento; (ii) informar al  Titular de forma explícita  y  previa,  además   de  los requisitos  generales de  la  El Titular tiene derecho a optar por no suministrar cualquier información sensible  solicitada por EcoCarga, relacionada, entre otros, con datos sobre su origen racial  o étnico, la pertenencia a sindicatos, organizaciones sociales o de derechos humanos, convicciones políticas, religiosas, de la vida sexual, biométricos o datos de salud. 
El Tratamiento de información de niños, niñas y adolescentes está prohibido salvo  aquellos datos que sean de naturaleza pública y cuando dicho Tratamiento cumpla  con los siguientes parámetros y requisitos: (i) que responda y respete el interés  superior de los niños, niñas y adolescentes; (ii) que se asegure el respeto de sus  derechos fundamentales; y (iii) se recolectarán los datos de los menores con el fin  de afiliarse a cajas de compensación y seguridad social en calidad de beneficiarios. 
El suministro de los Datos Personales de menores de edad es facultativo y debe realizarse con autorización de los padres de familia o representantes legales del menor. 
Autorización para la recolección de cualquier tipo de Dato Personal, cuáles de los datos que serán objeto de Tratamiento son sensibles y la finalidad del Tratamiento, así como obtener su consentimiento expreso; y (iii) ninguna actividad podrá condicionarse a que el Titular suministre Datos Sensibles.  

                </li>
                <li>
                    <h2>Procedimiento de consulta</h2>
                    El Titular o las Personas Autorizadas, podrán consultar los Datos Personales del Titular mediante comunicación escrita que contenga como mínimo la siguiente información:
                    <ol type="a">
                        <li>nombre del Titular y copia de los documentos que lo acrediten como tal</li>
                        <li>datos de contacto del Titular (teléfono, email, domicilio)</li>
                        <li>descripción clara y precisa de los Datos Personales respecto de los que requiere la consulta</li>
                        <li>descripción clara y precisa de la solicitud de consulta</li>
                        <li>en el caso en que el procedimiento de consulta sea requerido de una Persona Autorizada, la comunicación también tendrá que contener el nombre de la Persona Autorizada y copia de los documentos que lo acrediten como tal.</li>
                    </ol>
                    Dichos documentos deberán ser enviados al correo electrónico juanescs08@gmail.com con el asunto “Solicitud de consulta Datos Personales”. 
EcoCarga responderá la solicitud del Titular en un plazo máximo de diez (10) días hábiles contados a partir desde la fecha de recibo de la misma. Cuando no fuere posible atender la consulta dentro de dicho término, se informará al interesado, expresando los motivos de la demora y la fecha en que se atenderá su consulta, la cual en ningún caso podrá superar los cinco (5) días hábiles siguientes al vencimiento del primer término. 
En todos los casos, la respuesta se dará por la misma vía por la que hay presentado la solicitud o en su caso por cualquier otro medio acordado con el Titular o las Personas Autorizadas. 
El Titular tendrá el derecho de consultar de forma gratuita sus Datos Personales: (i) al menos una vez cada mes calendario; y (ii) cada vez que existan modificaciones sustanciales de la Política que motiven nuevas consultas. Para consultas cuya periodicidad sea mayor a una por cada mese calendario, el responsable podrá cobrar al Titular los gastos de envío, reproducción y, en su caso, certificación de documentos. 
En todo caso, los costos de reproducción no podrán ser mayores a los costos de recuperación del material correspondiente. 

                </li>
                <li>
                    <h2>Procedimiento de reclamo</h2>
                    El Titular o las Personas Autorizadas, que consideren que la información contenida en los Datos Personales del Titular debe ser objeto de corrección, actualización o supresión, o advierten el presunto incumplimiento de cualquiera de los deberes contenidos en la normativa aplicable, podrán presentar reclamo mediante comunicación escrita que contenga como mínimo la siguiente información:
                    <ol type="a">
                        <li>nombre del Titular y copia de los documentos que lo acrediten como tal</li>
                        <li>datos de contacto del Titular (teléfono, email, dirección)</li>
                        <li>descripción clara y precisa de los Datos Personales respecto de los que busca ejercer alguno de los derechos</li>
                        <li>descripción clara y precisa de su reclamo, de los hechos que dan lugar al reclamo y los documentos que se quiera hacer valer</li>
                        <li>cualquier otro elemento o documento que facilite la localización de los Datos Personales del Titular</li>
                        <li>en el caso de las solicitudes de corrección y/o actualización de Datos Personales del Titular, también indicar las modificaciones a realizarse y aportar la documentación que sustente su petición</li>
                        <li>en el caso en que el procedimiento de reclamo sea requerido por una Persona Autorizada, la comunicación también tendrá que contener el nombre de la Persona Autorizada y copia de los documentos que lo acrediten como tal</li>
                    </ol>
                    Dichos documentos deberán ser enviados al correo electrónico: juanescs08@gmail.com, el asunto “Solicitud de reclamo Datos Personales”. 
Si la información del reclamo es errónea y/o insuficiente y/o incompleta, Sistema B solicitará, dentro de los cinco (5) días hábiles siguientes a la recepción del reclamo, que aporte las informaciones y/o los elementos y/o los documentos necesarios para dar trámite al mismo. Transcurrido dos (2) meses contados a partir de la fecha del requerimiento, sin que el solicitante presente las informaciones y/o los elementos y/o los documentos requeridos, se tendrá por desistido el reclamo. 
Una vez recibido el reclamo completo y en un término no mayor a dos (2) días hábiles, se incluirá en la Base de Datos una leyenda que diga "reclamo en trámite" y el motivo del mismo. Dicha leyenda deberá mantenerse hasta que el reclamo sea decidido. En todo caso, EcoCarga atenderá el reclamo del Titular en un plazo máximo de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo.  Cuando no fuere posible atender el reclamo dentro de dicho término, se informará al interesado, los motivos de la demora y la fecha en que se atenderá su reclamo, la cual en ningún caso podrá superar los ocho (8) días hábiles siguientes al vencimiento del primer término. 
En caso de que quien reciba el reclamo no sea competente para resolverlo, dará traslado a quien corresponda en un término máximo de dos (2) días hábiles e informará de la situación el interesado. 
La respuesta se dará por la misma vía por la que haya presentado la solicitud o en su caso por cualquier otro medio acordado con el Titular o las Personas Autorizadas.

                </li>
                <li>
                    <h2>Transferencia y Transmisiones de Datos Personales</h2>
                    EcoCarga podrá transferir Datos Personales del Titular con el objeto de dar cumplimiento a sus obligaciones jurídicas y/o comerciales. Los receptores de los Datos Personales están obligados a mantener la confidencialidad de los Datos Personales y a cumplir la Política y los demás procedimientos e instrucciones de aplicación de la Política. 
La Transmisión y Transferencia internacionales de Datos Personales se hará de conformidad con las leyes de protección de la información aplicables. 

                </li>
                <li>
                    <h2>Seguridad de la información</h2>
                    Para garantizar al Titular en todo momento la salvaguarda de su confidencialidad,  los Datos Personales y los eventuales Datos Sensibles recolectados serán protegidos por medidas de seguridad adecuadas a fin de minimizar los riesgos de  daño, destrucción o pérdida - incluso accidental - alteración, destrucción, uso,  acceso o tratamiento ilícito, no autorizado o fraudulento o que no se ajuste a las  finalidades de recopilación de datos indicadas en la Política, de conformidad con  lo dispuesto en la legislación aplicable, en la Política y lo demás procedimientos e  instrucciones de aplicación de la Política. 
No obstante, lo anterior, EcoCarga no será responsable por ataques informáticos y en general cualquier acción que tenga como objetivo infringir las medidas de seguridad establecidas para la protección de los Datos Personales e información diferente a estos contenida en sus equipos informáticos o en aquellos contratados con terceros. 

                </li>
                <li>
                    <h2>Duración del Tratamiento</h2>
                    El Tratamiento durará el tiempo que sea razonable y necesario, a partir del año 2021 de acuerdo con las finalidades que lo justificaron, atendiendo a las disposiciones aplicables a la materia de que se trate y a los aspectos administrativos, contables, fiscales, jurídicos e históricos de la información.  En todo caso, los Datos Personales deberán ser conservados cuando así se requiera para el cumplimiento de una obligación legal o contractual.
                </li>
                <li>
                    <h2>Cambios a la Política</h2>
                    El Representante Legal de EcoCarga, se reserva el derecho de modificar y/o actualizar, total o parcialmente, la Política a efecto de incluir novedades legislativas, políticas internas, avances tecnológicos o prácticas de mercado.
La Política y sus correspondientes modificaciones serán publicadas en el sitio web de EcoCarga serán comunicadas a los Titulares. 
En caso de cambios sustanciales en el contenido de la Política y referidos principalmente a la identificación del responsable y a la finalidad del Tratamiento, los cuales pueden afectar el contenido de la Autorización, el Responsable o el Encargado comunicarán al Titular los cambios antes de o a más tardar al momento de implementar la nueva política. En todo caso, será necesario obtener una nueva Autorización cuando el cambio se refiera a la finalidad del Tratamiento. 
Es obligación del Titular revisar el contenido de la Política, antes de enviar cualquier dato considerado como Datos Personales. 

                </li>
                <li>
                    <h2>Atención de consultas, peticiones y reclamos</h2>
                    Las peticiones, consultas y reclamos formulados por lo titulares de datos personales bajo tratamiento de EcoCarga Colombia para ejercer sus derechos a conocer, actualizar, rectificar y suprimir datos o revocar la autorización deberán ser dirigidas al correo: juanescs08@gmail.com y allí serán direccionadas al área a que corresponda.
                </li>
                <li>
                    <h2>Ley aplicable</h2>
                    Todo lo concerniente a la entrega, recepción, manejo y protección de Datos Personales, entre el Titular y EcoCarga y/o el Encargado, se rige por la legislación colombiana vigente en materia de protección de Datos Personales.
                </li>
                <li>
                    <h2>Vigencia</h2>
                    La presente política de privacidad se encontrará en vigencia y sus disposiciones entrarán en efecto a partir del mes de noviembre de 2025.
                </li>
            </ol>

        </body>
        </html>
    `;

        res.send(htmlContent)

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default politicaTratamientoDatos;

