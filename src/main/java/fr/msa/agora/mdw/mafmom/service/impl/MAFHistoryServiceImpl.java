package fr.msa.agora.mdw.mafmom.service.impl;

import fr.msa.agora.mdw.mafmom.service.MAFHistoryService;
import fr.msa.agora.mdw.mafmom.domain.MAFHistory;
import fr.msa.agora.mdw.mafmom.repository.MAFHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link MAFHistory}.
 */
@Service
@Transactional
public class MAFHistoryServiceImpl implements MAFHistoryService {

    private final Logger log = LoggerFactory.getLogger(MAFHistoryServiceImpl.class);

    private final MAFHistoryRepository mAFHistoryRepository;

    public MAFHistoryServiceImpl(MAFHistoryRepository mAFHistoryRepository) {
        this.mAFHistoryRepository = mAFHistoryRepository;
    }

    /**
     * Save a mAFHistory.
     *
     * @param mAFHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MAFHistory save(MAFHistory mAFHistory) {
        log.debug("Request to save MAFHistory : {}", mAFHistory);
        return mAFHistoryRepository.save(mAFHistory);
    }

    /**
     * Get all the mAFHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MAFHistory> findAll(Pageable pageable) {
        log.debug("Request to get all MAFHistories");
        return mAFHistoryRepository.findAll(pageable);
    }


    /**
     * Get one mAFHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MAFHistory> findOne(Long id) {
        log.debug("Request to get MAFHistory : {}", id);
        return mAFHistoryRepository.findById(id);
    }

    /**
     * Delete the mAFHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MAFHistory : {}", id);
        mAFHistoryRepository.deleteById(id);
    }
}
