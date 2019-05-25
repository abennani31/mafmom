package fr.msa.agora.mdw.mafmom.web.rest;

import fr.msa.agora.mdw.mafmom.domain.MAFHistory;
import fr.msa.agora.mdw.mafmom.service.MAFHistoryService;
import fr.msa.agora.mdw.mafmom.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.msa.agora.mdw.mafmom.domain.MAFHistory}.
 */
@RestController
@RequestMapping("/api")
public class MAFHistoryResource {

    private final Logger log = LoggerFactory.getLogger(MAFHistoryResource.class);

    private static final String ENTITY_NAME = "mAFHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MAFHistoryService mAFHistoryService;

    public MAFHistoryResource(MAFHistoryService mAFHistoryService) {
        this.mAFHistoryService = mAFHistoryService;
    }

    /**
     * {@code POST  /maf-histories} : Create a new mAFHistory.
     *
     * @param mAFHistory the mAFHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mAFHistory, or with status {@code 400 (Bad Request)} if the mAFHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/maf-histories")
    public ResponseEntity<MAFHistory> createMAFHistory(@RequestBody MAFHistory mAFHistory) throws URISyntaxException {
        log.debug("REST request to save MAFHistory : {}", mAFHistory);
        if (mAFHistory.getId() != null) {
            throw new BadRequestAlertException("A new mAFHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MAFHistory result = mAFHistoryService.save(mAFHistory);
        return ResponseEntity.created(new URI("/api/maf-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /maf-histories} : Updates an existing mAFHistory.
     *
     * @param mAFHistory the mAFHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mAFHistory,
     * or with status {@code 400 (Bad Request)} if the mAFHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mAFHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/maf-histories")
    public ResponseEntity<MAFHistory> updateMAFHistory(@RequestBody MAFHistory mAFHistory) throws URISyntaxException {
        log.debug("REST request to update MAFHistory : {}", mAFHistory);
        if (mAFHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MAFHistory result = mAFHistoryService.save(mAFHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mAFHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /maf-histories} : get all the mAFHistories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mAFHistories in body.
     */
    @GetMapping("/maf-histories")
    public ResponseEntity<List<MAFHistory>> getAllMAFHistories(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of MAFHistories");
        Page<MAFHistory> page = mAFHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /maf-histories/:id} : get the "id" mAFHistory.
     *
     * @param id the id of the mAFHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mAFHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/maf-histories/{id}")
    public ResponseEntity<MAFHistory> getMAFHistory(@PathVariable Long id) {
        log.debug("REST request to get MAFHistory : {}", id);
        Optional<MAFHistory> mAFHistory = mAFHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mAFHistory);
    }

    /**
     * {@code DELETE  /maf-histories/:id} : delete the "id" mAFHistory.
     *
     * @param id the id of the mAFHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/maf-histories/{id}")
    public ResponseEntity<Void> deleteMAFHistory(@PathVariable Long id) {
        log.debug("REST request to delete MAFHistory : {}", id);
        mAFHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
