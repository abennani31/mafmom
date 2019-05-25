package fr.msa.agora.mdw.mafmom.web.rest;

import fr.msa.agora.mdw.mafmom.MafmomApp;
import fr.msa.agora.mdw.mafmom.domain.Contrat;
import fr.msa.agora.mdw.mafmom.repository.ContratRepository;
import fr.msa.agora.mdw.mafmom.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.msa.agora.mdw.mafmom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.msa.agora.mdw.mafmom.domain.enumeration.EtatQueue;
/**
 * Integration tests for the {@Link ContratResource} REST controller.
 */
@SpringBootTest(classes = MafmomApp.class)
public class ContratResourceIT {

    private static final String DEFAULT_QUEUE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_QUEUE_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_DEMANDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEMANDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final EtatQueue DEFAULT_ETAT_QUEUE = EtatQueue.PREDEMANDE;
    private static final EtatQueue UPDATED_ETAT_QUEUE = EtatQueue.A_TRAITER;

    @Autowired
    private ContratRepository contratRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restContratMockMvc;

    private Contrat contrat;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContratResource contratResource = new ContratResource(contratRepository);
        this.restContratMockMvc = MockMvcBuilders.standaloneSetup(contratResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contrat createEntity(EntityManager em) {
        Contrat contrat = new Contrat()
            .queueName(DEFAULT_QUEUE_NAME)
            .dateDemande(DEFAULT_DATE_DEMANDE)
            .etatQueue(DEFAULT_ETAT_QUEUE);
        return contrat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contrat createUpdatedEntity(EntityManager em) {
        Contrat contrat = new Contrat()
            .queueName(UPDATED_QUEUE_NAME)
            .dateDemande(UPDATED_DATE_DEMANDE)
            .etatQueue(UPDATED_ETAT_QUEUE);
        return contrat;
    }

    @BeforeEach
    public void initTest() {
        contrat = createEntity(em);
    }

    @Test
    @Transactional
    public void createContrat() throws Exception {
        int databaseSizeBeforeCreate = contratRepository.findAll().size();

        // Create the Contrat
        restContratMockMvc.perform(post("/api/contrats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrat)))
            .andExpect(status().isCreated());

        // Validate the Contrat in the database
        List<Contrat> contratList = contratRepository.findAll();
        assertThat(contratList).hasSize(databaseSizeBeforeCreate + 1);
        Contrat testContrat = contratList.get(contratList.size() - 1);
        assertThat(testContrat.getQueueName()).isEqualTo(DEFAULT_QUEUE_NAME);
        assertThat(testContrat.getDateDemande()).isEqualTo(DEFAULT_DATE_DEMANDE);
        assertThat(testContrat.getEtatQueue()).isEqualTo(DEFAULT_ETAT_QUEUE);
    }

    @Test
    @Transactional
    public void createContratWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contratRepository.findAll().size();

        // Create the Contrat with an existing ID
        contrat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContratMockMvc.perform(post("/api/contrats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrat)))
            .andExpect(status().isBadRequest());

        // Validate the Contrat in the database
        List<Contrat> contratList = contratRepository.findAll();
        assertThat(contratList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContrats() throws Exception {
        // Initialize the database
        contratRepository.saveAndFlush(contrat);

        // Get all the contratList
        restContratMockMvc.perform(get("/api/contrats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contrat.getId().intValue())))
            .andExpect(jsonPath("$.[*].queueName").value(hasItem(DEFAULT_QUEUE_NAME.toString())))
            .andExpect(jsonPath("$.[*].dateDemande").value(hasItem(DEFAULT_DATE_DEMANDE.toString())))
            .andExpect(jsonPath("$.[*].etatQueue").value(hasItem(DEFAULT_ETAT_QUEUE.toString())));
    }
    
    @Test
    @Transactional
    public void getContrat() throws Exception {
        // Initialize the database
        contratRepository.saveAndFlush(contrat);

        // Get the contrat
        restContratMockMvc.perform(get("/api/contrats/{id}", contrat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contrat.getId().intValue()))
            .andExpect(jsonPath("$.queueName").value(DEFAULT_QUEUE_NAME.toString()))
            .andExpect(jsonPath("$.dateDemande").value(DEFAULT_DATE_DEMANDE.toString()))
            .andExpect(jsonPath("$.etatQueue").value(DEFAULT_ETAT_QUEUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContrat() throws Exception {
        // Get the contrat
        restContratMockMvc.perform(get("/api/contrats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContrat() throws Exception {
        // Initialize the database
        contratRepository.saveAndFlush(contrat);

        int databaseSizeBeforeUpdate = contratRepository.findAll().size();

        // Update the contrat
        Contrat updatedContrat = contratRepository.findById(contrat.getId()).get();
        // Disconnect from session so that the updates on updatedContrat are not directly saved in db
        em.detach(updatedContrat);
        updatedContrat
            .queueName(UPDATED_QUEUE_NAME)
            .dateDemande(UPDATED_DATE_DEMANDE)
            .etatQueue(UPDATED_ETAT_QUEUE);

        restContratMockMvc.perform(put("/api/contrats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContrat)))
            .andExpect(status().isOk());

        // Validate the Contrat in the database
        List<Contrat> contratList = contratRepository.findAll();
        assertThat(contratList).hasSize(databaseSizeBeforeUpdate);
        Contrat testContrat = contratList.get(contratList.size() - 1);
        assertThat(testContrat.getQueueName()).isEqualTo(UPDATED_QUEUE_NAME);
        assertThat(testContrat.getDateDemande()).isEqualTo(UPDATED_DATE_DEMANDE);
        assertThat(testContrat.getEtatQueue()).isEqualTo(UPDATED_ETAT_QUEUE);
    }

    @Test
    @Transactional
    public void updateNonExistingContrat() throws Exception {
        int databaseSizeBeforeUpdate = contratRepository.findAll().size();

        // Create the Contrat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContratMockMvc.perform(put("/api/contrats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrat)))
            .andExpect(status().isBadRequest());

        // Validate the Contrat in the database
        List<Contrat> contratList = contratRepository.findAll();
        assertThat(contratList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContrat() throws Exception {
        // Initialize the database
        contratRepository.saveAndFlush(contrat);

        int databaseSizeBeforeDelete = contratRepository.findAll().size();

        // Delete the contrat
        restContratMockMvc.perform(delete("/api/contrats/{id}", contrat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Contrat> contratList = contratRepository.findAll();
        assertThat(contratList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contrat.class);
        Contrat contrat1 = new Contrat();
        contrat1.setId(1L);
        Contrat contrat2 = new Contrat();
        contrat2.setId(contrat1.getId());
        assertThat(contrat1).isEqualTo(contrat2);
        contrat2.setId(2L);
        assertThat(contrat1).isNotEqualTo(contrat2);
        contrat1.setId(null);
        assertThat(contrat1).isNotEqualTo(contrat2);
    }
}
