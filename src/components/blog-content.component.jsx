/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-dark.css';
import { BlockMath } from 'react-katex';

const Link = ({ url, text }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-blue underline hover:text-dark-blue"
        >
            {text}
        </a>
    );
};





const Img = ({ url, caption }) => {
    return (
        <div>
            <img src={url} />
            { caption.length ? <p className="w-full text-center leading-7 my-3 md:mb-12 text-xl text-dark-grey">{caption}</p> : "" }
        </div>
    )
}

const Quote = ({ quote, caption }) => {
    // Replace &nbsp; with HTML entity &#160;
    quote = quote.replace(/&nbsp;/g, '&#160;');
    // Replace newline characters with <br> tags
    quote = quote.replace(/\n/g, '<br>');

    return (
        <div className="border-l-4 border-light-green text-black bg-grey p-4 rounded-lg shadow-md">
            <p className="text-lg text-xl leading-7 italic" dangerouslySetInnerHTML={{ __html: quote }}></p>
            {caption && <p className="text-sm font-bold text-light-green">{caption}</p>}
        </div>
    );
};







const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 ${ style == "ordered" ? " list-decimal" : " list-disc"}`}>

            {
               items.map((listItem, i) => {
                    return <li key={i} className="my-4 text-xl leading-7 font-linearsans" dangerouslySetInnerHTML={{ __html: listItem }}></li>
               }) 
            }

        </ol>
    )
}

hljs.configure({
    languages: ['python'],
    es: {
      next: true,
    },
});

const CodeBlog = ({ language = 'python', code }) => {
    const codeRef = useRef();
    useEffect(() => {
      if (codeRef && codeRef.current) {
        hljs.highlightBlock(codeRef.current);
      }
    }, [code]);
  
    return (
      <pre className='rounded-lg code-blog'>
        <code className={`language-${language}`} ref={codeRef}>
          {code}
        </code>
      </pre>
    );
};


const Delimiter = () => {
    return (
        <hr className="my-6 border-t-2 border-gray-300" />
    );
};



const BlogContent = ({ block }) => {
    let { type, data } = block;

    if (type === "paragraph") {
        return <p dangerouslySetInnerHTML={{ __html: data.text }} className='text-xl font-linearsans leading-9' />;
    } 

    if (type === "header") {
        const Tag = `h${data.level}`;
        return <Tag dangerouslySetInnerHTML={{ __html: data.text }} />;
    }

    if (type === "image") {
        return <Img url={data.file.url} caption={data.caption} />;
    }

    if (type === "quote") {
        return <Quote quote={data.text} caption={data.caption} />;
    }
    
    if (type === "list") {
        return <List style={data.style} items={data.items} />;
    }

    if (type === "code") {
        return <CodeBlog code={data.code} />;
    }

    if (type === "Math") {
        return <BlockMath math={data.math} />;
    }
    if (type === "delimiter") {
        return <Delimiter />;
    }
    if (type === "link") {
        return (
            <div className="border rounded-md p-4 shadow-md">
                <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {data.meta.title || data.link}
                </a>
                {data.meta.description && <p>{data.meta.description}</p>}
                {data.meta.image?.url && <img src={data.meta.image.url} alt="Link Preview" />}
            </div>
        );
    }

}

export default BlogContent;