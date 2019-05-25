package fr.msa.agora.mdw.mafmom.web.rest;

import fr.msa.agora.mdw.mafmom.domain.MAF;
import fr.msa.agora.mdw.mafmom.repository.MAFRepository;
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
 * REST controller for managing {@link fr.msa.agora.mdw.mafmom.domain.MAF}.
 */
@RestController
@RequestMapping("/api")
public class MAFResource {

    private final Logger log = LoggerFactory.getLogger(MAFResource.class);

    private static final String ENTITY_NAME = "mAF";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MAFRepository mAFRepository;

    public MAFResource(MAFRepository mAFRepository) {
        this.mAFRepository = mAFRepository;
    }

    /**
     * {@code POST  /mafs} : Create a new mAF.
     *
     * @param mAF the mAF to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mAF, or with status {@code 400 (Bad Request)} if the mAF has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mafs")
    public ResponseEntity<MAF> createMAF(@RequestBody MAF mAF) throws URISyntaxException {
        log.debug("REST request to save MAF : {}", mAF);
        if (mAF.getId() != null) {
            throw new BadRequestAlertException("A new mAF cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MAF result = mAFRepository.save(mAF);
        return ResponseEntity.created(new URI("/api/mafs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mafs} : Updates an existing mAF.
     *
     * @param mAF the mAF to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mAF,
     * or with status {@code 400 (Bad Request)} if the mAF is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mAF couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mafs")
    public ResponseEntity<MAF> updateMAF(@RequestBody MAF mAF) throws URISyntaxException {
        log.debug("REST request to update MAF : {}", mAF);
        if (mAF.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MAF result = mAFRepository.save(mAF);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mAF.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mafs} : get all the mAFS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mAFS in body.
     */
    @GetMapping("/mafs")
    public ResponseEntity<List<MAF>> getAllMAFS(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of MAFS");
        Page<MAF> page = mAFRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /mafs/:id} : get the "id" mAF.
     *
     * @param id the id of the mAF to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mAF, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mafs/{id}")
    public ResponseEntity<MAF> getMAF(@PathVariable Long id) {
        log.debug("REST request to get MAF : {}", id);
        Optional<MAF> mAF = mAFRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mAF);
    }

    /**
     * {@code DELETE  /mafs/:id} : delete the "id" mAF.
     *
     * @param id the id of the mAF to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mafs/{id}")
    public ResponseEntity<Void> deleteMAF(@PathVariable Long id) {
        log.debug("REST request to delete MAF : {}", id);
        mAFRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
