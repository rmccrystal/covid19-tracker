import React, {Component} from 'react';
import {Card, Elevation, H1} from "@blueprintjs/core";
import "./About.scss";

export default class Wiki extends Component {
    render() {
        return (
            <div className="container mt-5 bp3-text-large wiki">
                <Card elevation={Elevation.FOUR} className="wiki-card">
                    <H1 className="text-center">Brief Information on COVID19</H1>
                    <small>source: <a
                        href="https://www.worldometers.info/coronavirus/#repro">worldometers.info</a></small>

                    <h2>How dangerous is the virus?
                    </h2>
                    <p>There are three parameters to understand in order to assess the magnitude of the risk posed by
                        this novel coronavirus: </p>
                    <ul>
                        <li><a href="#ro">Transmission Rate (<strong>Ro</strong>)</a> - number of newly infected
                            people from a single case
                        </li>
                        <li><a href="#fata">Case Fatality Rate (CFR)</a> - percent of
                            cases that result in death
                        </li>
                        <li>Determine whether <a
                            href="https://www.worldometers.info/coronavirus/coronavirus-incubation-period/#asy"
                            target="_blank" rel="noopener noreferrer">asymptomatic
                            transmission </a>is possible
                        </li>
                    </ul>
                    <h2 id="ro">How contagious is the Wuhan Coronavirus? (Ro) </h2>
                    <p>The <em>attack rate</em> or <em>transmissibility</em> (how rapidly the disease spreads) of a
                        virus is indicated by its reproductive number (Ro,
                        pronounced <em>R-nought</em> or <em>r-zero</em>), which represents the average number of people
                        to which a single infected person will transmit the virus.</p>
                    <ul>
                        <li>WHO's estimated (on Jan. 23) Ro to be between 1.4 and 2.5. <sup>[<a
                            href="#ref-13">13</a>]</sup></li>
                        <li>Other studies have estimated a Ro between 3.6 and 4.0, and between 2.24 to 3.58. <sup>[<a
                            href="#ref-23">23</a>]</sup>.
                        </li>
                        <li>Preliminary studies had estimated Ro to be between <strong>1.5 and 3.5.</strong> <sup>[<a
                            href="#ref-5">5</a>][<a href="#ref-6">6</a>][<a href="#ref-7">7</a>]</sup></li>
                        <li>An outbreak with a reproductive number of below 1 will gradually disappear.</li>
                        <li>For comparison, the Ro for the common flu is 1.3 and for SARS it was 2.0.</li>
                    </ul>
                    <h2 id="fata">Fatality Rate (<em>case fatality ratio</em> or <em>CFR</em>) of the Wuhan Coronavirus
                    </h2>
                    <p><em>See full details: <a
                        href="https://worldometers.info/coronavirus/coronavirus-death-rate/"><strong>Coronavirus
                        Fatality
                        Rate</strong></a></em></p>
                    <p>The novel coronavirus' case <strong>fatality rate</strong> has been estimated at
                        around <strong>2%</strong>, in the WHO press conference held on January 29, 2020 <sup>[<a
                            href="#ref-16">16</a>]</sup> . However, it noted that, without knowing how many were
                        infected, it was too early to be able to put a percentage on the mortality rate figure.</p>
                    <p> A prior estimate <strong><sup>[<a href="#ref-9">9</a>]</sup></strong> had put that number at 3%.
                    </p>
                    <p>Fatality rate can change as a virus can mutate, according to epidemiologists.</p>
                    <p>For comparison, the case fatality rate for SARS was 10%, and for MERS 34%.</p>
                    <h2 id="incubation">Incubation Period (how long it takes for symptoms to appear) </h2>
                    <p><em>See full details: <a href="/coronavirus/coronavirus-incubation-period/"><strong>COVID-19
                        Coronavirus Incubation Period </strong></a></em></p>
                    <p>Symptoms of COVID-19 may appear in as few as 2 days or as long as 14 (estimated ranges vary from
                        2-10 days, 2-14 days, and 10-14 days, <a href="/coronavirus/coronavirus-incubation-period/">see
                            details</a>), during which the virus is contagious but the patient does not display any
                        symptom (<em>asymptomatic transmission</em>).</p>
                    <h2 id="age">Age and conditions of Coronavirus cases </h2>
                    <p>According to early estimates by China's National Health Commission (NHC), about 80% of those who
                        died were over the age of 60 and 75% of them had
                        pre-existing health conditions such as cardiovascular diseases and
                        diabetes.<sup>[<a href="#ref-24">24</a>]</sup></p>
                    <p>According to the <a
                        href="https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200127-sitrep-7-2019--ncov.pdf">WHO
                        Situation Report no. 7</a> issued on Jan. 27:
                    </p>
                    <ul>
                        <li>The median age of <strong>cases </strong>detected <strong>outside </strong>of China is 45
                            years, ranging from 2 to 74 years.
                        </li>
                        <li> 71% of cases were male.</li>
                    </ul>
                    <p>A study of 138 hospitalized patients with NCIP found that the median age was 56 years
                        (interquartile range, 42-68; range, 22-92 years) and 75 (54.3%) were men.<sup>[<a
                            href="#ref-25">25</a>]</sup></p>
                    <p>The WHO, in its <a
                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters">Myth
                        busters FAQs</a>, addresses the question: <em>"Does the new coronavirus affect older people, or
                        are younger people also susceptible?" </em>by answering that: </p>
                    <ul>
                        <li><strong>People of all ages can be infected </strong>by the novel coronavirus COVID-19.</li>
                        <li><strong>Older people</strong>, and people with<strong> pre-existing medical
                            conditions</strong> (such as asthma, diabetes, heart disease) appear to be <strong>more
                            vulnerable to becoming severely ill</strong> with the virus.
                        </li>
                    </ul>
                    <h4> Patient who died in the Philippines was a 44-year old male</h4>
                    The patient who died in the Philippines on February 2, in what was the first death occurring outside
                    of China, was a 44-year-old Chinese man from Wuhan who was admitted on Jan. 25 after experiencing
                    fever, cough, and sore throat, before developing severe pneumonia. In the last few days, “the
                    patient was stable and showed signs of improvement, however, the condition of the patient
                    deteriorated within his last 24 hours resulting in his demise."
                    according to the Philippine Department of Health.
                    <h4>Serious Cases of 30 year old patients in France </h4>
                    <p>
                        As of Jan. 29, according to French authorities, the conditions of the two earliest Paris cases
                        had worsened and the patients were being treated in intensive care, according to French
                        authorities. The patients have been described as a young couple aged <strong>30 and 31 years
                        old</strong>, both Chinese citizens from Wuhan who were asymptomatic when they arrived in Paris
                        on January 18 <sup>[<a href="#ref-19">19</a>]</sup>.</p>
                    <h4><strong>Age and Sex of the first deaths as reported by the China National Health Commission
                        (NHC) </strong></h4>
                    <p> The NHC reported the details of the first 17 deaths up to 24 pm on January 22, 2020. The deaths
                        included 13 males and 4 females. The median age of the deaths was 75 (range 48-89)
                        years.<sup>[<a href="#ref-21">21</a>]</sup></p>
                    <h2>WHO Risk Assessment: Global Emergency</h2>
                    <p><em>See full details: <a href="/coronavirus/who-coronavirus/"><strong>WHO coronavirus
                        updates</strong></a></em></p>
                    <p>On January 30, the World Health Organization declared the coronavirus outbreak a Global Public
                        Health Emergency.</p>
                    <p>For more information from the WHO regarding novel coronavirus: <em><a
                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">WHO page on Novel
                        Coronavirus (2019-nCoV)</a> </em></p>

                    <h2>Sources</h2>
                    <div>
                        <ol>
                            <li id="ref-1"><a
                                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/">Novel
                                Coronavirus (2019-nCoV) situation reports</a> -
                                <a href="https://www.who.int/">World Health Organization</a> (WHO)
                            </li>
                            <li id="ref-2"><a href="https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html">2019
                                Novel Coronavirus (2019-nCoV) in the U.S.</a> -. <a href="https://www.cdc.gov/">U.S.
                                Centers for Disease Control and Prevention</a> (CDC)
                            </li>
                            <li id="ref-3"><a href="http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml">Outbreak
                                Notification</a> - National Health Commission (NHC) of the People’s Republic of China
                            </li>
                            <li id="ref-4"><a
                                href="https://www.health.gov.au/health-topics/novel-coronavirus-2019-ncov">Novel
                                coronavirus (2019-nCoV)</a> - Australian Government Department of Health
                            </li>
                            <li id="ref-5"><a href="https://www.medrxiv.org/content/10.1101/2020.01.23.20018549v2">Novel
                                coronavirus 2019-nCoV: early estimation of epidemiological parameters and epidemic
                                prediction</a> - Jonathan M. Read et al, Jan. 23,2020.
                            </li>
                            <li id="ref-6"><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3524675">Early
                                Transmissibility Assessment of a Novel Coronavirus in Wuhan, China</a> - Maimuna
                                Majumder and Kenneth D. Mandl, Harvard University - Computational Health Informatics
                                Program - Posted: 24 Jan 2020 Last revised: 27 Jan 2020
                            </li>
                            <li id="ref-7"><a
                                href="https://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/news--wuhan-coronavirus/">Report
                                3: Transmissibility of 2019-nCoV</a> - 25 January 2020 - Imperial College London&zwnj;
                            </li>
                            <li id="ref-8"><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3809029/">Case fatality
                                risk of influenza A(H1N1pdm09): a systematic review</a> - Epidemiology. Nov. 24, 2013
                            </li>
                            <li id="ref-9"><a
                                href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30185-9/fulltext#tbl1">A
                                novel coronavirus outbreak of global health concern</a> - Chen Want et al. The Lancet.
                                January 24, 2020
                            </li>
                            <li id="ref-10"><a href="https://www.cdc.gov/coronavirus/2019-ncov/about/symptoms.html">Symptoms
                                of Novel Coronavirus (2019-nCoV)</a> - CDC
                            </li>
                            <li id="ref-11"><a
                                href="https://www.aljazeera.com/news/2020/01/chinas-national-health-commission-news-conference-coronavirus-200126105935024.html">China's
                                National Health Commission news conference on coronavirus</a> - Al Jazeera. January 26,
                                2020
                            </li>
                            <li id="ref-12"><a
                                href="https://www.reuters.com/article/us-china-health-who/wuhan-lockdown-unprecedented-shows-commitment-to-contain-virus-who-representative-in-china-idUSKBN1ZM1G9">Wuhan
                                lockdown 'unprecedented', shows commitment to contain virus: WHO representative in
                                China</a> - Reuters. January 23, 2020
                            </li>
                            <li id="ref-13"><a
                                href="https://www.who.int/news-room/detail/23-01-2020-statement-on-the-meeting-of-the-international-health-regulations-(2005)-emergency-committee-regarding-the-outbreak-of-novel-coronavirus-(2019-ncov)">Statement
                                on the meeting of the International Health Regulations (2005) Emergency Committee
                                regarding the outbreak of novel coronavirus (2019-nCoV)</a> - WHO, January 23, 2020
                            </li>
                            <li id="ref-14"><a
                                href="https://www.who.int/news-room/events/detail/2020/01/30/default-calendar/international-health-regulations-emergency-committee-on-novel-coronavirus-in-china">International
                                Health Regulations Emergency Committee on novel coronavirus in China</a> - WHO, January
                                30, 2020
                            </li>
                            <li id="ref-15"><a
                                href="https://www.theonlinecitizen.com/2020/01/29/human-to-human-transmission-of-wuhan-virus-outside-of-china-confirmed-in-germany-japan-and-vietnam/">Human-to-human
                                transmission of Wuhan virus outside of China, confirmed in Germany, Japan and
                                Vietnam</a> - The Online Citizen, Jan. 29, 2020
                            </li>
                            <li id="ref-16"><a href="https://www.pscp.tv/WHO/1OdJrqEvgaeGX">Who: "Live from Geneva on
                                the new #coronavirus outbreak"</a></li>
                            <li id="ref-17"><a
                                href="https://www.cdc.gov/media/releases/2020/p0130-coronavirus-spread.html">CDC
                                Confirms Person-to-Person Spread of New Coronavirus in the United States</a> - CDC Press
                                Release, Jan. 30, 2020
                            </li>
                            <li id="ref-18"><a
                                href="https://www.gov.uk/government/news/cmo-confirms-cases-of-coronavirus-in-england">CMO
                                confirms cases of coronavirus in England</a> - CMO, UK, Jan. 31, 2020
                            </li>
                            <li id="ref-19"><a
                                href="https://www.thelocal.fr/20200131/coronavirus-in-france-what-you-need-to-know">Coronavirus
                                in France: what you need to know</a> - The Local France, Jan. 31, 2020
                            </li>
                            <li id="ref-20"><a href="https://tass.com/society/1115101">First two persons infected with
                                coronavirus identified in Russia</a> - Tass, Jan. 31, 2020
                            </li>
                            <li id="ref-21"><a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/jmv.25689?af=R">Updated
                                understanding of the outbreak of 2019 novel coronavirus (2019nCoV) in Wuhan, China</a> -
                                Journal of Medical Virology, Jan. 29, 2020
                            </li>
                            <li id="ref-22"><a
                                href="https://www.medrxiv.org/content/10.1101/2020.01.27.20018952v1.full.pdf">Estimating
                                the effective reproduction number of the 2019-nCoV in China</a> - Zhidong Cao et al.,
                                Jan. 29, 2020
                            </li>
                            <li id="ref-23"><a
                                href="https://www.sciencedirect.com/science/article/pii/S1201971220300539">Preliminary
                                estimation of the basic reproduction number of novel coronavirus (2019-nCoV) in China,
                                from 2019 to 2020: A data-driven analysis in the early phase of the outbreak</a> - Jan.
                                30, 2020
                            </li>
                            <li id="ref-24"><a href="https://www.bbc.com/news/world-asia-china-51368873">Coronavirus:
                                Window of opportunity to act, World Health Organization says</a> - BBC, Feb,\. 4, 2020
                            </li>
                            <li id="ref-25"><a
                                href="https://jamanetwork.com/journals/jama/fullarticle/2761044?guestAccessKey=f61bd430-07d8-4b86-a749-bec05bfffb65">Clinical
                                Characteristics of 138 Hospitalized Patients With 2019 Novel Coronavirus–Infected
                                Pneumonia in Wuhan, China</a> - Wang et. al, JAMA, Feb. 7, 2020
                            </li>
                        </ol>
                    </div>
                </Card>
            </div>
        )
    }
}

