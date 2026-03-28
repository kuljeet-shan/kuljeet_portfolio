import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Award, FileText, BookOpen, Newspaper, Plus, Presentation, Book, Bookmark } from "lucide-react";
import cvPdf from "@/assets/CV_Kuljeet.pdf";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const PublicationsSection = () => {
  const journals = [
    {
      title: "GeneRiskCalc: A Web-Based Tool for Genetic Risk Association Analysis in Case-Control Studies",
      authors: "Amrit Sudershan, Kuljeet Singh",
      venue: "BMC Bioinformatics, Springer",
      year: "2025",
      badges: ["SCIE", "Q1", "IF: 2.9", "Communicated"],
      doi: "#",
    },
    {
      title: "A Hybrid Ensemble Framework with Particle Swarm Optimization for Network Anomaly Detection",
      authors: "Narinder Verma, Gourav Kumar, Kuljeet Singh*",
      venue: "Discover Applied Sciences, Springer",
      year: "2025",
      badges: ["Scopus", "Communicated"],
      doi: "#",
    },
    {
      title: "A novel univariate feature selection with ANOVA F-test based machine learning model for Intrusion Detection Framework of Robotics system",
      authors: "Narinder Verma, Neerendra Kumar, Kuljeet Singh",
      venue: "International Journal of Computational Intelligence Systems, Springer",
      year: "2025",
      badges: ["SCIE", "Q2", "IF: 2.5", "Communicated"],
      doi: "#",
    },
    {
      title: "Exploring the impact of social media on shaping collective value perceptions and motivations for electric vehicle adoption",
      authors: "Karan Dixit, Anurag Sinha, Kuljeet Singh* et al.",
      venue: "OPSEARCH, Springer",
      year: "2025",
      badges: ["Scopus", "Q2", "IF: 1.4", "Communicated"],
      doi: "#",
    },
    {
      title: "Breast Cancer Prediction Using Self Adaptive-Sea Lion Optimization based Recurrent Neural Network product",
      authors: "Santhosh Kumar G, Anurag Sinha, Kuljeet Singh* et al.",
      venue: "Evolving Systems, Springer",
      year: "2025",
      badges: ["SCIE", "Q2", "IF: 2.7", "Communicated"],
      doi: "#",
    },
    {
      title: "Machine Learning in Neuroimaging and Computational Pathophysiology of Parkinson’s Disease: A comprehensive review and metaanalysis",
      authors: "Khushi Sharma, Manjula Shanbhog, Kuljeet Singh*",
      venue: "Clinical Neurology and Neurosurgery, Elsevier",
      year: "2025",
      badges: ["SCIE", "Q2", "IF: 1.8", "Communicated"],
      doi: "#",
    },
    {
      title: "RAG-Descriptor Enhanced Secure Cloth Recommendation System: A Hybrid Algorithm and Explainable AI-Driven Content-Based Image Retrieval (CBIR) Framework",
      authors: "Anurag Sinha, Kuljeet Singh et al.",
      venue: "Journal of Intelligent Systems, DE GRUYTER",
      year: "2025",
      badges: ["ESCI", "Q3", "IF: 2.1", "Communicated"],
      doi: "#",
    },
    {
      title: "Clinical Insights into Neuroimaging and AIDriven Techniques in Alzheimer’s disease: A Systematic Review and Meta-Analysis",
      authors: "Deepti Nayak, Manjula Shanbhog, Kuljeet Singh*",
      venue: "Journal of Clinical Neuroscience, Elsevier",
      year: "2025",
      badges: ["SCIE", "Q2", "IF: 1.9", "Communicated"],
      doi: "#",
    },
    {
      title: "Neuroimaging and AI-Driven Approaches in Autism Spectrum Disorder: A Systematic Review of Emerging Diagnostics and Therapeutics",
      authors: "Khushi Mogha, Neha Saini, Kuljeet Singh*",
      venue: "Discover Applied Sciences, Springer",
      year: "2025",
      badges: ["Scopus", "Communicated"],
      doi: "#",
    },
    {
      title: "A Systematic Review of Brain Imaging Studies to Mitigate Schizophrenia Risk: Insights from the Past to Shape the Future",
      authors: "Cheshta Nagpal, Kuljeet Singh*",
      venue: "Psychiatry Research, Elsevier",
      year: "2025",
      badges: ["SCIE", "Q1", "IF: 4.2", "Communicated"],
      doi: "#",
    },
    {
      title: "Effective Detection of Covid-19 using Xception Net Architecture: A Technical Investigation using X-ray Images",
      authors: "Surbhi Gupta, Kuljeet Singh*, et al.",
      venue: "Health Informatics Journal, SAGE Journals",
      year: "2024",
      badges: ["Scopus", "SSCI", "IF: 2.2", "Communicated"],
      doi: "#",
    },
    {
      title: "BC-MBINet: A Novel Architecture for Accurate Classification of Breast Cancer with Microscopic Biopsy Images using Deep Convolutional Neural Networks",
      authors: "Kuljeet Singh*, Amrit Sudershan, et al.",
      venue: "International Journal of Pattern Recognition and Artificial Intelligence, World Scientific",
      year: "2022",
      badges: ["SCIE", "IF: 1.261", "Communicated"],
      doi: "#",
    },
    {
      title: "Deep CP-CXR: A Deep Learning Model for Classification of Covid-19 and Pneumonia Disease using Chest X-ray Images",
      authors: "Kuljeet Singh*, Anubha Gaur, et al.",
      venue: "Annals of Data Science, Springer",
      year: "2024",
      badges: ["Scopus", "Q1", "Published"],
      doi: "https://doi.org/10.1007/s40745-025-00601-3",
    },
    {
      title: "COVID-19 changed our world: A systematic review",
      authors: "Kuljeet Singh, Agar Chander Pushap, et al.",
      venue: "Global Health Economics and Sustainability",
      year: "2024",
      badges: ["Crossref", "Published"],
      doi: "https://doi.org/10.36922/ghes.3992",
    },
    {
      title: "IRAM–NET Model: Image Residual Agnostics Meta Learning based Network for Rare De Novo Glioblastoma Diagnosis",
      authors: "Kuljeet Singh*, Deepti Malhotra",
      venue: "Neural Computing and Applications, Springer",
      year: "2024",
      badges: ["Scopus", "Q1", "IF: 4.5", "Accepted"],
      doi: "https://doi.org/10.1007/s00521-024-10347-3",
    },
    {
      title: "A comprehensive investigation of risk association between the -786 T> C, +884 G > A, VNTR, rs743506, rs3918226 of eNOS and susceptibility of migraine: A updated meta-analysis utilizing Trial Sequential Analysis",
      authors: "Amrit Sudershan, Kuljeet Singh, et al.",
      venue: "Journal of Molecular Neuroscience, Springer",
      year: "2023",
      badges: ["SCIE", "Q2", "IF: 3.1", "Accepted"],
      doi: "https://doi.org/10.1007/s12031-023-02167-2",
    },
    {
      title: "BC-NET: Early Treatment of Breast Cancer using Nested Ensemble Technique of Machine Learning",
      authors: "Kuljeet Singh*, Sourabh Shastri, et al.",
      venue: "Automatic Control and Computer Sciences, Springer",
      year: "2023",
      badges: ["ESCI", "Q3", "IF: 0.9", "Accepted"],
      doi: "https://doi.org/10.3103/S0146411623060093",
    },
    {
      title: "Meta-Health: Learning-to-learn (Meta-Learning) as a Next Generation of Deep Learning Exploring Healthcare Challenges and Solutions for Rare Disorders: A Systematic Analysis",
      authors: "Kuljeet Singh*, Deepti Malhotra",
      venue: "Archives of Computational Methods in Engineering, Springer",
      year: "2023",
      badges: ["SCIE", "Q1", "IF: 9.7", "Accepted"],
      doi: "https://doi.org/10.1007/s11831-023-09927-8",
    },
    {
      title: "LiteCovidNet: A Lightweight Deep Neural Network Model for detection of COVID-19 using X-ray Images",
      authors: "Sourabh Shastri, Sachin Kumar, Shilpa Mahajan, Kuljeet Singh, et al.",
      venue: "International Journal of Imaging Systems and Technology, Wiley",
      year: "2022",
      badges: ["SCIE", "Q2", "IF: 3.3", "Accepted"],
      doi: "https://doi.org/10.1002/ima.22770",
    },
    {
      title: "The Complexities of Migraine: A Debate Among Migraine Researchers: A Review",
      authors: "Amrit Sudershan, Kanak Mahajan, Kuljeet Singh, et al.",
      venue: "Clinical Neurology and Neurosurgery, Elsevier",
      year: "2022",
      badges: ["Published"],
      doi: "https://doi.org/10.1016/j.clineuro.2022.107136",
    },
    {
      title: "CheXImageNet: A Novel Architecture for Accurate Classification of Covid-19 with Chest X-ray Digital Images using Deep Convolutional Neural Networks",
      authors: "Sourabh Shastri, Isha Kansal, Sachin Kumar, Kuljeet Singh, et al.",
      venue: "Health and Technology, Springer",
      year: "2022",
      badges: ["ESCI", "Q3", "IF: 2.5", "Accepted"],
      doi: "https://doi.org/10.1007/s12553-021-00630-x",
    },
    {
      title: "Black Fungus Immunosuppressive Epidemic with Covid-19 Associated Mucormycosis (Zygomycosis): A Clinical and Diagnostic Perspective from India",
      authors: "Kuljeet Singh*, Sachin Kumar, et al.",
      venue: "Immunogenetics, Springer",
      year: "2021",
      badges: ["SCIE", "Q3", "IF: 3.2", "Accepted"],
      doi: "https://doi.org/10.1007/s00251-021-01226-5",
    },
    {
      title: "CoBiD-Net: A Tailored Deep Learning Ensemble Model for Time Series Forecasting of Covid-19",
      authors: "Sourabh Shastri, Kuljeet Singh*, et al.",
      venue: "Spatial Information Research, Springer",
      year: "2021",
      badges: ["ESCI", "Q2", "IF: 2.4", "Accepted"],
      doi: "https://doi.org/10.1007/s41324-021-00408-3",
    },
    {
      title: "NestEn_SmVn: boosted nested ensemble multiplexing to diagnose coronary artery disease",
      authors: "Sourabh Shastri, Kuljeet Singh, et al.",
      venue: "Evolving Systems, Springer",
      year: "2021",
      badges: ["SCIE", "Q2", "IF: 3.2", "Accepted"],
      doi: "https://doi.org/10.1007/s12530-021-09384-3",
    },
    {
      title: "Time series forecasting of Covid-19 using deep learning models: India-USA comparative case study",
      authors: "Sourabh Shastri, Kuljeet Singh, et al.",
      venue: "Chaos, Solitons and Fractals, Elsevier",
      year: "2020",
      badges: ["SCIE", "Q1", "IF: 7.8", "Accepted"],
      doi: "https://doi.org/10.1016/j.chaos.2020.110227",
    },
    {
      title: "A nested stacking ensemble model for predicting districts with high and low maternal mortality ratio (MMR) in India",
      authors: "Sourabh Shastri, Paramjit Kour, Sachin Kumar, Kuljeet Singh, et al.",
      venue: "International Journal of Information Technology, Springer",
      year: "2020",
      badges: ["Q2", "Accepted"],
      doi: "https://doi.org/10.1007/s41870-020-00560-3",
    },
    {
      title: "Deep-LSTM Ensemble Framework to Forecast Covid-19: An Insight to the Global Pandemic",
      authors: "Sourabh Shastri, Kuljeet Singh, et al.",
      venue: "International Journal of Information Technology, Springer",
      year: "2021",
      badges: ["Q2", "Accepted"],
      doi: "https://doi.org/10.1007/s41870-020-00571-0",
    },
    {
      title: "GBoost: A novel GradingAdaBoost Ensemble approach for automatic identification of Erythemato-Squamous Disease",
      authors: "Sourabh Shastri, Paramjit Kour, Sachin Kumar, Kuljeet Singh, et al.",
      venue: "International Journal of Information Technology, Springer",
      year: "2020",
      badges: ["Q2", "Accepted"],
      doi: "https://doi.org/10.1007/s41870-020-00589-4",
    },
    {
      title: "Implementation of Exponential Smoothing for Forecasting Time Series Data",
      authors: "Kuljeet Singh, Sourabh Shastri, et al.",
      venue: "International Journal of Scientific Research in Computer Science Applications and Management Studies",
      year: "2019",
      badges: ["UGC-CARE", "Accepted"],
      doi: "#",
    },
    {
      title: "Performance Evaluation of ANN Classifier for Knowledge Discovery in Child Immunization Databases",
      authors: "Arun Singh Bhadwal, Sourabh Shastri, Paramjit Kour, Sachin Kumar, Kuljeet Singh, et al.",
      venue: "International Journal of Computational Engineering Research (IJCER)",
      year: "2019",
      badges: ["UGC-CARE", "Accepted"],
      doi: "#",
    },
    {
      title: "Classification of Maternal Healthcare Data using Naïve Bayes",
      authors: "Paramjit Kour, Sourabh Shastri, Arun Singh Bhadwal, Sachin Kumar, Kuljeet Singh, et al.",
      venue: "International Journal of Computer Sciences and Engineering",
      year: "2019",
      badges: ["UGC-CARE", "Accepted"],
      doi: "https://doi.org/10.26438/ijcse/v7i3.388394",
    }
  ];

  const conferences = [
    {
      title: "Evaluating the Efficacy of AI and Machine Learning Models for Early Alzheimer's Disease Detection Using Multi-Modal Data",
      authors: "Deepti Nayak, Kuljeet Singh*",
      venue: "ICDMIS-2025, Springer Nature LNNS",
      year: "2025",
      badges: ["Scopus", "Submitted"],
      doi: "#",
    },
    {
      title: "Weather Prediction Using Hybrid Machine Learning Models: ML-based Comparative Analysis",
      authors: "Khushi Mogha, Neha Saini, Kuljeet Singh*",
      venue: "ICDMIS-2025, Springer Nature LNNS",
      year: "2025",
      badges: ["Scopus", "Submitted"],
      doi: "#",
    },
    {
      title: "AI-Driven Approaches and Brain Function Advances in Schizophrenia Research: A Systematic Review",
      authors: "Cheshta Nagpal, Neha Saini, Kuljeet Singh*",
      venue: "ICNDSA-2025, Springer Nature LNNS",
      year: "2025",
      badges: ["Scopus", "Accepted"],
      doi: "#",
    },
    {
      title: "Analyzing the Diagnosis and Treatment of Astrocytoma, Oligodendroglioma and Glioblastoma: A Systematic Review",
      authors: "Yuvika Singh, Manjula Shanbhog, Kuljeet Singh*",
      venue: "ICASST-2025, Springer Nature LNNS",
      year: "2025",
      badges: ["Scopus", "Accepted"],
      doi: "#",
    },
    {
      title: "Meta-Learning based efficient framework for diagnosing rare disorders: A comprehensive survey",
      authors: "Kuljeet Singh*, Deepti Malhotra",
      venue: "ICIASC-2023, AIP Conf. Proc.",
      year: "2024",
      badges: ["Scopus", "Published"],
      doi: "https://doi.org/10.1063/5.0199881",
    },
    {
      title: "MtL-RODD: Meta Learning Based Rare Ophthalmic Disorders Diagnosis Framework: A Systematic and Comparative Analysis",
      authors: "Jaffar Amin Chacket, Deepti Malhotra, Kuljeet Singh",
      venue: "ICDAI-2024, Springer Nature LNNS",
      year: "2024",
      badges: ["Scopus", "Accepted"],
      doi: "#",
    },
    {
      title: "Meta-Learning Based System for the Early Diagnosis of Rare Glioblastoma Diseases: A Comprehensive Analysis",
      authors: "Kuljeet Singh*, Deepti Malhotra",
      venue: "ICDMIS-2024, Springer Nature LNNS",
      year: "2024",
      badges: ["Scopus", "Accepted"],
      doi: "#",
    }
  ];

  const bookChapters = [
    {
      title: "En-Fuzzy-ClaF: A Machine Learning based Stack-Ensembled Fuzzy Classification Framework for Diagnosing Coronavirus",
      authors: "Sourabh Shastri, Sachin Kumar, Kuljeet Singh, Vibhakar Mansotra",
      venue: "Society 5.0 and the Future of Emerging Computational Technologies, CRC Press, Taylor & Francis Group",
      year: "2022",
      badges: ["CRC Press", "Published"],
      doi: "https://doi.org/10.1201/9781003184140",
    },
    {
      title: "Designing Contactless Automated Systems using IoT, Sensors and Artificial Intelligence to mitigate COVID-19",
      authors: "Sourabh Shastri, Sachin Kumar, Kuljeet Singh, Vibhakar Mansotra",
      venue: "Internet of Things, CRC Press, Taylor & Francis Group",
      year: "2022",
      badges: ["CRC Press", "Published"],
      doi: "http://dx.doi.org/10.1201/9781003219620-13",
    },
    {
      title: "Convolutional bi-directional long-short-term-memory based model to forecast COVID-19 in Algeria",
      authors: "Sourabh Shastri, Kuljeet Singh, Astha Sharma, Mohamed Lounis, Sachin Kumar, and Vibhakar Mansotra",
      venue: "Computational Intelligence in Healthcare Applications, Academic Press",
      year: "2022",
      badges: ["Academic Press", "Published"],
      doi: "https://doi.org/10.1016/B978-0-323-99031-8.00003-X",
    }
  ];

  const authoredBooks = [
    {
      title: "Mera Gaon : Mere Prerna Srot",
      authors: "Shashank Kulkarni, Kuljeet Singh",
      venue: "Highbrow Publication",
      year: "2023",
      badges: ["Non-Fiction", "Published"],
      doi: "#",
      description: "\"Mera Gaon: Mere Prerna Srot,\" is a captivating non-fiction book that explores rural India and highlights the unrecognized and unsung heroes who have made significant impacts on our societies."
    }
  ];

  const visibleJournals = journals.slice(0, 10);
  const hiddenJournals = journals.slice(10);

  const visibleConferences = conferences.slice(0, 4);
  const hiddenConferences = conferences.slice(4);

  return (
    <section id="publications" className="py-24 sm:py-32 md:py-40 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 px-4 py-1">Intellectual Contributions</Badge>
            <AnimatedText 
              text={<>Research & <span className="text-gradient-accent">Publications</span></>}
              textClassName="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
              underlineClassName="text-accent"
            />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive record of 40+ peer-reviewed contributions across high-impact international journals, conferences, and books.
          </p>
        </div>

        <Tabs defaultValue="journals" className="max-w-6xl mx-auto">
          <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
            <TabsList className="flex w-max mx-auto bg-background/50 border border-accent/10 p-1 h-auto rounded-xl backdrop-blur-sm">
              <TabsTrigger value="journals" className="px-6 rounded-lg py-3 data-[state=active]:bg-accent data-[state=active]:text-white transition-all">
                Journals ({journals.length})
              </TabsTrigger>
              <TabsTrigger value="conferences" className="px-6 rounded-lg py-3 data-[state=active]:bg-accent data-[state=active]:text-white transition-all">
                Conferences ({conferences.length})
              </TabsTrigger>
              <TabsTrigger value="book-chapters" className="px-6 rounded-lg py-3 data-[state=active]:bg-accent data-[state=active]:text-white transition-all">
                Book Chapters ({bookChapters.length})
              </TabsTrigger>
              <TabsTrigger value="authored-books" className="px-6 rounded-lg py-3 data-[state=active]:bg-accent data-[state=active]:text-white transition-all">
                Books ({authoredBooks.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="journals" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {visibleJournals.map((pub, index) => (
                <PublicationCard key={index} pub={pub} index={index} />
              ))}
            </div>

            {hiddenJournals.length > 0 && (
              <div className="flex justify-center pt-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="group relative px-8 py-6 bg-black hover:bg-black/90 text-white rounded-2xl transition-all hover:scale-105 hover:shadow-glow overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <Plus className="mr-2 h-5 w-5 animate-pulse" />
                      View More Journal Publications (+{hiddenJournals.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-accent/20">
                    <DialogHeader className="p-8 border-b border-accent/10 bg-accent/5">
                      <DialogTitle className="text-3xl font-black flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-accent" />
                        Complete Journal Portfolio
                      </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[70vh] p-8">
                      <div className="space-y-6">
                        {journals.map((pub, index) => (
                          <div key={index} className="relative group">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-all rounded-full" />
                            <PublicationCard pub={pub} index={index} isCompact />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-6 border-t border-accent/10 flex justify-between items-center bg-accent/5">
                      <span className="text-sm font-medium text-muted-foreground">Total Publications: {journals.length}</span>
                      <Button variant="ghost" className="gap-2" asChild>
                        <a href={cvPdf} download>
                          <FileText className="w-4 h-4" />
                          Download Full PDF
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </TabsContent>

          <TabsContent value="conferences" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {visibleConferences.map((pub, index) => (
                <PublicationCard key={index} pub={pub} index={index} type="conference" />
              ))}
            </div>

            {hiddenConferences.length > 0 && (
              <div className="flex justify-center pt-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="group relative px-8 py-6 bg-black hover:bg-black/90 text-white rounded-2xl transition-all hover:scale-105 hover:shadow-glow overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <Plus className="mr-2 h-5 w-5 animate-pulse" />
                      View More Conference Papers (+{hiddenConferences.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-accent/20">
                    <DialogHeader className="p-8 border-b border-accent/10 bg-accent/5">
                      <DialogTitle className="text-3xl font-black flex items-center gap-3">
                        <Presentation className="w-8 h-8 text-accent" />
                        Complete Conference Portfolio
                      </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[70vh] p-8">
                      <div className="space-y-6">
                        {conferences.map((pub, index) => (
                          <div key={index} className="relative group">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-all rounded-full" />
                            <PublicationCard pub={pub} index={index} isCompact type="conference" />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-6 border-t border-accent/10 flex justify-between items-center bg-accent/5">
                      <span className="text-sm font-medium text-muted-foreground">Total Papers: {conferences.length}</span>
                      <Button variant="ghost" className="gap-2" asChild>
                        <a href={cvPdf} download>
                          <FileText className="w-4 h-4" />
                          Download Full PDF
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </TabsContent>

          <TabsContent value="book-chapters" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {bookChapters.map((pub, index) => (
                <PublicationCard key={index} pub={pub} index={index} type="chapter" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authored-books" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {authoredBooks.map((pub, index) => (
                <PublicationCard key={index} pub={pub} index={index} type="book" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const PublicationCard = ({ pub, index, isCompact = false, type = "journal" }: { pub: any, index: number, isCompact?: boolean, type?: "journal" | "conference" | "book" | "chapter" }) => {
  const getIcon = () => {
    switch (type) {
      case "conference": return <Presentation className="w-full h-full" />;
      case "book": return <Book className="w-full h-full" />;
      case "chapter": return <Bookmark className="w-full h-full" />;
      default: return <Newspaper className="w-full h-full" />;
    }
  };

  return (
    <Card
      className={`glass overflow-hidden border-accent/10 hover:border-accent/30 transition-all group relative ${isCompact ? 'p-4' : 'p-6 sm:p-8'}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity w-24 h-24 -rotate-12">
        {getIcon()}
      </div>
      
      <div className="flex items-start gap-4 sm:gap-6 relative z-10">
        <div className={`rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${isCompact ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'}`}>
          <div className={`${isCompact ? 'h-6 w-6' : 'h-7 w-7 sm:h-8 w-8'} text-accent`}>
            {type === "journal" ? <Award className="w-full h-full" /> : getIcon()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {pub.year && (
              <span className="text-xs font-black px-2 py-1 bg-accent/10 text-accent rounded-md uppercase tracking-widest">
                {pub.year}
              </span>
            )}
            <div className="flex flex-wrap gap-1.5">
              {pub.badges.map((badge: string, i: number) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-background/50 text-[10px] font-bold uppercase border-accent/20 group-hover:border-accent/40"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <h3 className={`${isCompact ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold mb-3 leading-tight group-hover:text-accent transition-colors`}>
            {pub.title}
          </h3>
          
          <p className="text-sm sm:text-base text-muted-foreground mb-3 font-medium">
            {pub.authors.split("Kuljeet Singh").map((part: string, i: number, arr: any[]) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <strong className="text-foreground border-b-2 border-accent/30">Kuljeet Singh</strong>}
              </span>
            ))}
          </p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground/80 italic font-semibold mb-4">
            <span className="flex items-center gap-1.5">
              {type === "conference" ? <Presentation className="w-4 h-4 text-accent/60" /> : <BookOpen className="w-4 h-4 text-accent/60" />}
              {pub.venue}
            </span>
          </div>

          {pub.description && (
            <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-3 italic">
              {pub.description}
            </p>
          )}

          {pub.doi && pub.doi !== "#" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-accent hover:bg-accent/10 hover:text-accent font-bold text-xs uppercase tracking-wider gap-2 p-0 h-auto"
              asChild
            >
              <a href={pub.doi} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Access Publication
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
