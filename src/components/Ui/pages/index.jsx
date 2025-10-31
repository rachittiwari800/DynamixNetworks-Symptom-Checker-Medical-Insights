import { useState } from "react";
import { Activity, Shield, TrendingUp, Sparkles, Search, X, AlertCircle, CheckCircle2, AlertTriangle, ArrowLeft, Moon, Sun } from "lucide-react";
import { symptoms, getMatchingConditions } from "../data/symptomsData";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Filter symptoms based on search
  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add or remove symptom
  const toggleSymptom = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  // Analyze symptoms
  const analyzeSymptoms = () => {
    if (selectedSymptoms.length > 0) {
      const matchedConditions = getMatchingConditions(selectedSymptoms);
      setResults(matchedConditions);
    }
  };

  // Go back to symptom selection
  const goBack = () => {
    setResults(null);
  };

  // Get severity badge styling
  const getSeverityStyle = (severity) => {
    const styles = {
      low: "bg-success text-success-foreground",
      moderate: "bg-warning text-warning-foreground",
      high: "bg-destructive text-destructive-foreground"
    };
    return styles[severity] || "bg-primary text-primary-foreground";
  };

  const getSeverityIcon = (severity) => {
    if (severity === "low") return <CheckCircle2 className="h-5 w-5" />;
    if (severity === "moderate") return <AlertTriangle className="h-5 w-5" />;
    if (severity === "high") return <AlertCircle className="h-5 w-5" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MediCheck</h1>
              <p className="text-xs text-muted-foreground">Smart Health Insights</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-accent"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Hero Section - Only show when not viewing results */}
      {!results && (
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Health Analysis</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Understanding Your Symptoms Made Simple
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get instant insights into your health symptoms with our intelligent symptom checker. 
              Quick, reliable, and designed to help you make informed decisions about your well-being.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Evidence-Based</h3>
              <p className="text-sm text-muted-foreground">
                Insights based on verified medical datasets and literature
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent matching of symptoms to potential conditions
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Early Awareness</h3>
              <p className="text-sm text-muted-foreground">
                Helping you recognize when to seek professional care
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Results View */}
          {results ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={goBack} className="rounded-full p-2 hover:bg-accent">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-2xl font-semibold">Your Results</h2>
                  <p className="text-muted-foreground">Based on the symptoms you've reported</p>
                </div>
              </div>

              <div className="bg-accent/50 border border-primary/20 p-4 rounded-lg flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>Important:</strong> This tool provides general information only and is not a substitute for professional medical advice. 
                  Always consult a healthcare provider for proper diagnosis and treatment.
                </div>
              </div>

              {results.length === 0 ? (
                <div className="bg-card p-6 rounded-xl shadow-soft">
                  <p className="text-center text-muted-foreground">No matching conditions found. Please try selecting different symptoms.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((condition) => (
                    <div key={condition.id} className="bg-card p-6 rounded-xl shadow-soft border border-border/50">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold">{condition.name}</h3>
                            <p className="text-muted-foreground mt-1">{condition.description}</p>
                          </div>
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getSeverityStyle(condition.severity)}`}>
                            {getSeverityIcon(condition.severity)}
                            {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)} Severity
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Recommendations
                          </h4>
                          <ul className="space-y-1 ml-6">
                            {condition.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm list-disc">{rec}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-accent/50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            When to Seek Medical Help
                          </h4>
                          <p className="text-sm">{condition.whenToSeekHelp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Symptom Checker View */
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border/50">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">What symptoms are you experiencing?</h2>
                  <p className="text-muted-foreground">Select all that apply to get personalized insights</p>
                </div>

                {/* Search Box */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                {/* Selected Symptoms */}
                {selectedSymptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map(symptomId => {
                      const symptom = symptoms.find(s => s.id === symptomId);
                      return (
                        <div key={symptomId} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                          {symptom?.name}
                          <button
                            onClick={() => toggleSymptom(symptomId)}
                            className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Symptom Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {filteredSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedSymptoms.includes(symptom.id)
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">{symptom.name}</div>
                      <div className="text-xs text-muted-foreground">{symptom.category}</div>
                    </button>
                  ))}
                </div>

                {/* Analyze Button */}
                <button
                  onClick={analyzeSymptoms}
                  disabled={selectedSymptoms.length === 0}
                  className={`w-full py-3 px-8 rounded-lg font-medium transition-all ${
                    selectedSymptoms.length === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Analyze Symptoms ({selectedSymptoms.length})
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and does not provide medical advice.
            </p>
            <p>
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
