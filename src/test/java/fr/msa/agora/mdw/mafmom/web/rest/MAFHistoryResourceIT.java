package fr.msa.agora.mdw.mafmom.web.rest;

import fr.msa.agora.mdw.mafmom.MafmomApp;
import fr.msa.agora.mdw.mafmom.domain.MAFHistory;
import fr.msa.agora.mdw.mafmom.repository.MAFHistoryRepository;
import fr.msa.agora.mdw.mafmom.service.MAFHistoryService;
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

/**
 * Integration tests for the {@Link MAFHistoryResource} REST controller.
 */
@SpringBootTest(classes = MafmomApp.class)
public class MAFHistoryResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MAFHistoryRepository mAFHistoryRepository;

    @Autowired
    private MAFHistoryService mAFHistoryService;

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

    private MockMvc restMAFHistoryMockMvc;

    private MAFHistory mAFHistory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MAFHistoryResource mAFHistoryResource = new MAFHistoryResource(mAFHistoryService);
        this.restMAFHistoryMockMvc = MockMvcBuilders.standaloneSetup(mAFHistoryResource)
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
    public static MAFHistory createEntity(EntityManager em) {
        MAFHistory mAFHistory = new MAFHistory()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return mAFHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MAFHistory createUpdatedEntity(EntityManager em) {
        MAFHistory mAFHistory = new MAFHistory()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return mAFHistory;
    }

    @BeforeEach
    public void initTest() {
        mAFHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createMAFHistory() throws Exception {
        int databaseSizeBeforeCreate = mAFHistoryRepository.findAll().size();

        // Create the MAFHistory
        restMAFHistoryMockMvc.perform(post("/api/maf-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mAFHistory)))
            .andExpect(status().isCreated());

        // Validate the MAFHistory in the database
        List<MAFHistory> mAFHistoryList = mAFHistoryRepository.findAll();
        assertThat(mAFHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        MAFHistory testMAFHistory = mAFHistoryList.get(mAFHistoryList.size() - 1);
        assertThat(testMAFHistory.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testMAFHistory.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createMAFHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mAFHistoryRepository.findAll().size();

        // Create the MAFHistory with an existing ID
        mAFHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMAFHistoryMockMvc.perform(post("/api/maf-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mAFHistory)))
            .andExpect(status().isBadRequest());

        // Validate the MAFHistory in the database
        List<MAFHistory> mAFHistoryList = mAFHistoryRepository.findAll();
        assertThat(mAFHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMAFHistories() throws Exception {
        // Initialize the database
        mAFHistoryRepository.saveAndFlush(mAFHistory);

        // Get all the mAFHistoryList
        restMAFHistoryMockMvc.perform(get("/api/maf-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mAFHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getMAFHistory() throws Exception {
        // Initialize the database
        mAFHistoryRepository.saveAndFlush(mAFHistory);

        // Get the mAFHistory
        restMAFHistoryMockMvc.perform(get("/api/maf-histories/{id}", mAFHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mAFHistory.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMAFHistory() throws Exception {
        // Get the mAFHistory
        restMAFHistoryMockMvc.perform(get("/api/maf-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMAFHistory() throws Exception {
        // Initialize the database
        mAFHistoryService.save(mAFHistory);

        int databaseSizeBeforeUpdate = mAFHistoryRepository.findAll().size();

        // Update the mAFHistory
        MAFHistory updatedMAFHistory = mAFHistoryRepository.findById(mAFHistory.getId()).get();
        // Disconnect from session so that the updates on updatedMAFHistory are not directly saved in db
        em.detach(updatedMAFHistory);
        updatedMAFHistory
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restMAFHistoryMockMvc.perform(put("/api/maf-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMAFHistory)))
            .andExpect(status().isOk());

        // Validate the MAFHistory in the database
        List<MAFHistory> mAFHistoryList = mAFHistoryRepository.findAll();
        assertThat(mAFHistoryList).hasSize(databaseSizeBeforeUpdate);
        MAFHistory testMAFHistory = mAFHistoryList.get(mAFHistoryList.size() - 1);
        assertThat(testMAFHistory.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testMAFHistory.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingMAFHistory() throws Exception {
        int databaseSizeBeforeUpdate = mAFHistoryRepository.findAll().size();

        // Create the MAFHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMAFHistoryMockMvc.perform(put("/api/maf-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mAFHistory)))
            .andExpect(status().isBadRequest());

        // Validate the MAFHistory in the database
        List<MAFHistory> mAFHistoryList = mAFHistoryRepository.findAll();
        assertThat(mAFHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMAFHistory() throws Exception {
        // Initialize the database
        mAFHistoryService.save(mAFHistory);

        int databaseSizeBeforeDelete = mAFHistoryRepository.findAll().size();

        // Delete the mAFHistory
        restMAFHistoryMockMvc.perform(delete("/api/maf-histories/{id}", mAFHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<MAFHistory> mAFHistoryList = mAFHistoryRepository.findAll();
        assertThat(mAFHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MAFHistory.class);
        MAFHistory mAFHistory1 = new MAFHistory();
        mAFHistory1.setId(1L);
        MAFHistory mAFHistory2 = new MAFHistory();
        mAFHistory2.setId(mAFHistory1.getId());
        assertThat(mAFHistory1).isEqualTo(mAFHistory2);
        mAFHistory2.setId(2L);
        assertThat(mAFHistory1).isNotEqualTo(mAFHistory2);
        mAFHistory1.setId(null);
        assertThat(mAFHistory1).isNotEqualTo(mAFHistory2);
    }
}
