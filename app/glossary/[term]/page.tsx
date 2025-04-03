"use client";
import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import Layout from "../glossary_layout";
import Link from 'next/link';

const formatDefinition = (text: string) => {
  if (!text) return text;
  
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className={styles.definitionParagraph}>
      {paragraph.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < paragraph.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  ));
};

export default function DefinitionPage({ params }: { params: { term: string } }) {
  const [definition, setDefinition] = useState<{ term: string; definition: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!definition) return;
    
    const textToCopy = `${definition.term}\n\n${definition.definition}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  useEffect(() => {
    let isCurrent = true;
    const timer = setTimeout(() => {
      const fetchDefinition = async () => {
        try {
          const decodedTerm = decodeURIComponent(params.term);
          const response = await fetch(`http://127.0.0.1:5000/api/definition/${decodedTerm}`);
          
          if (!response.ok) throw new Error("Failed to fetch definition");
          
          const data = await response.json();
          if (isCurrent) {
            setDefinition({
              term: data.term || decodedTerm,
              definition: data.definition || "Definition not found."
            });
          }
        } catch (error) {
          if (isCurrent) {
            setDefinition({
              term: decodeURIComponent(params.term),
              definition: "Failed to fetch definition."
            });
          }
        } finally {
          if (isCurrent) setIsLoading(false);
        }
      };

      fetchDefinition();
    }, 300);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [params.term]);

  if (isLoading || !definition) {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.loadingPlaceholder}></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.body}>
        <div className={styles.articleContainer}>
          <Link href="/glossary" className={styles.backArrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <button 
            onClick={copyToClipboard} 
            className={styles.copyButton}
            aria-label="Copy definition"
          >
            {copied ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8M10 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V10C20 9.46957 19.7893 8.96086 19.4142 8.58579C19.0391 8.21071 18.5304 8 18 8H10C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10V18C8 18.5304 8.21071 19.0391 8.58579 19.4142C8.96086 19.7893 9.46957 20 10 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          
          <h1 className={styles.heading2}>{definition.term}</h1>
          <div className={styles.definitionContainer}>
            {formatDefinition(definition.definition)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
