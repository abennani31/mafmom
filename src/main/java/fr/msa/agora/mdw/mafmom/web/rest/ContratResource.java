package fr.msa.agora.mdw.mafmom.web.rest;

import fr.msa.agora.mdw.mafmom.domain.Contrat;
import fr.msa.agora.mdw.mafmom.repository.ContratRepository;
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
 * REST controller for managing {@link fr.msa.agora.mdw.mafmom.domain.Contrat}.
 */
@RestController
@RequestMapping("/api")
public class ContratResource {

    private final Logger log = LoggerFactory.getLogger(ContratResource.class);

    private static final String ENTITY_NAME = "contrat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContratRepository contratRepository;

    public ContratResource(ContratRepository contratRepository) {
        this.contratRepository = contratRepository;
    }

    /**
     * {@code POST  /contrats} : Create a new contrat.
     *
     * @param contrat the contrat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contrat, or with status {@code 400 (Bad Request)} if the contrat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contrats")
    public ResponseEntity<Contrat> createContrat(@RequestBody Contrat contrat) throws URISyntaxException {
        log.debug("REST request to save Contrat : {}", contrat);
        if (contrat.getId() != null) {
            throw new BadRequestAlertException("A new contrat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contrat result = contratRepository.save(contrat);
        return ResponseEntity.created(new URI("/api/contrats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contrats} : Updates an existing contrat.
     *
     * @param contrat the contrat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contrat,
     * or with status {@code 400 (Bad Request)} if the contrat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contrat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contrats")
    public ResponseEntity<Contrat> updateContrat(@RequestBody Contrat contrat) throws URISyntaxException {
        log.debug("REST request to update Contrat : {}", contrat);
        if (contrat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contrat result = contratRepository.save(contrat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contrat.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contrats} : get all the contrats.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contrats in body.
     */
    @GetMapping("/contrats")
    public ResponseEntity<List<Contrat>> getAllContrats(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Contrats");
        Page<Contrat> page = contratRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contrats/:id} : get the "id" contrat.
     *
     * @param id the id of the contrat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contrat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contrats/{id}")
    public ResponseEntity<Contrat> getContrat(@PathVariable Long id) {
        log.debug("REST request to get Contrat : {}", id);
        Optional<Contrat> contrat = contratRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contrat);
    }

    /**
     * {@code DELETE  /contrats/:id} : delete the "id" contrat.
     *
     * @param id the id of the contrat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contrats/{id}")
    public ResponseEntity<Void> deleteContrat(@PathVariable Long id) {
        log.debug("REST request to delete Contrat : {}", id);
        contratRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
