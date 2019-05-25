package fr.msa.agora.mdw.mafmom.web.rest;

import fr.msa.agora.mdw.mafmom.MafmomApp;
import fr.msa.agora.mdw.mafmom.domain.MAF;
import fr.msa.agora.mdw.mafmom.repository.MAFRepository;
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
import java.util.List;

import static fr.msa.agora.mdw.mafmom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MAFResource} REST controller.
 */
@SpringBootTest(classes = MafmomApp.class)
public class MAFResourceIT {

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PUBLIE = false;
    private static final Boolean UPDATED_PUBLIE = true;

    @Autowired
    private MAFRepository mAFRepository;

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

    private MockMvc restMAFMockMvc;

    private MAF mAF;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MAFResource mAFResource = new MAFResource(mAFRepository);
        this.restMAFMockMvc = MockMvcBuilders.standaloneSetup(mAFResource)
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
    public static MAF createEntity(EntityManager em) {
        MAF mAF = new MAF()
            .version(DEFAULT_VERSION)
            .publie(DEFAULT_PUBLIE);
        return mAF;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MAF createUpdatedEntity(EntityManager em) {
        MAF mAF = new MAF()
            .version(UPDATED_VERSION)
            .publie(UPDATED_PUBLIE);
        return mAF;
    }

    @BeforeEach
    public void initTest() {
        mAF = createEntity(em);
    }

    @Test
    @Transactional
    public void createMAF() throws Exception {
        int databaseSizeBeforeCreate = mAFRepository.findAll().size();

        // Create the MAF
        restMAFMockMvc.perform(post("/api/mafs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mAF)))
            .andExpect(status().isCreated());

        // Validate the MAF in the database
        List<MAF> mAFList = mAFRepository.findAll();
        assertThat(mAFList).hasSize(databaseSizeBeforeCreate + 1);
        MAF testMAF = mAFList.get(mAFList.size() - 1);
        assertThat(testMAF.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testMAF.isPublie()).isEqualTo(DEFAULT_PUBLIE);
    }

    @Test
    @Transactional
    public void createMAFWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mAFRepository.findAll().size();

        // Create the MAF with an existing ID
        mAF.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMAFMockMvc.perform(post("/api/mafs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mAF)))
            .andExpect(status().isBadRequest());

        // Validate the MAF in the database
        List<MAF> mAFList = mAFRepository.findAll();
        assertThat(mAFList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMAFS() throws Exception {
        // Initialize the database
        mAFRepository.saveAndFlush(mAF);

        // Get all the mAFList
        restMAFMockMvc.perform(get("/api/mafs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mAF.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].publie").value(hasItem(DEFAULT_PUBLIE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getMAF() throws Exception {
        // Initialize the database
        mAFRepository.saveAndFlush(mAF);

        // Get the mAF
        restMAFMockMvc.perform(get("/api/mafs/{id}", mAF.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mAF.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.publie").value(DEFAULT_PUBLIE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMAF() throws Exception {
        // Get the mAF
        restMAFMockMvc.perform(get("/api/mafs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMAF() throws Exception {
        // Initialize the database
        mAFRepository.saveAndFlush(mAF);

        int databaseSizeBeforeUpdate = mAFRepository.findAll().size();

        // Update the mAF
        MAF updatedMAF = mAFRepository.findById(mAF.getId()).get();
        // Disconnect from session so that the updates on updatedMAF are not directly saved in db
        em.detach(updatedMAF);
        updatedMAF
            .version(UPDATED_VERSION)
            .publie(UPDATED_PUBLIE);

        restMAFMockMvc.perform(put("/api/mafs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMAF)))
            .andExpect(status().isOk());

        // Validate the MAF in the database
        List<MAF> mAFList = mAFRepository.findAll();
        assertThat(mAFList).hasSize(databaseSizeBeforeUpdate);
        MAF testMAF = mAFList.get(mAFList.size() - 1);
        assertThat(testMAF.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testMAF.isPublie()).isEqualTo(UPDATED_PUBLIE);
    }

    @Test
    @Transactional
    public void updateNonExistingMAF() throws Exception {
        int databaseSizeBeforeUpdate = mAFRepository.findAll().size();

        // Create the MAF

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMAFMockMvc.perform(put("/api/mafs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mAF)))
            .andExpect(status().isBadRequest());

        // Validate the MAF in the database
        List<MAF> mAFList = mAFRepository.findAll();
        assertThat(mAFList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMAF() throws Exception {
        // Initialize the database
        mAFRepository.saveAndFlush(mAF);

        int databaseSizeBeforeDelete = mAFRepository.findAll().size();

        // Delete the mAF
        restMAFMockMvc.perform(delete("/api/mafs/{id}", mAF.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<MAF> mAFList = mAFRepository.findAll();
        assertThat(mAFList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MAF.class);
        MAF mAF1 = new MAF();
        mAF1.setId(1L);
        MAF mAF2 = new MAF();
        mAF2.setId(mAF1.getId());
        assertThat(mAF1).isEqualTo(mAF2);
        mAF2.setId(2L);
        assertThat(mAF1).isNotEqualTo(mAF2);
        mAF1.setId(null);
        assertThat(mAF1).isNotEqualTo(mAF2);
    }
}
