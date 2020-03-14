from flask import Flask, render_template, request
import urllib.request
import plotly
import plotly.graph_objects as go
import pandas as pd
import numpy as np
import json

app = Flask(__name__, static_url_path='/static')

############################################
memory = {}
papers = {}

def GetReferences(semantic_id, arxiv, depth, top_n=10):
    print(depth)
    if semantic_id in memory:
        data = memory[semantic_id]
    else:
        link = 'http://api.semanticscholar.org/v1/paper/{}'.format('arXiv:' + semantic_id if arxiv else semantic_id)

        with urllib.request.urlopen(link) as paper:
            data = json.loads(paper.read().decode())
        memory[data['paperId']] = data
        
    papers[data['paperId']] = {'title': data['title'],
                               'references': [{'paperId': reference['paperId'], 'title': reference['title']} for reference in data['references']] if depth > 2 else [],
                               'citations': len(data['citations'])}
    
    # Problem to fix. After going one layer down, you want to prune articles that don't fit the top_n. This will lead to top_n^depth time
    # Right now, we have ~avg_n^depth time, as we exhaustively search through every reference's reference.
    # Every depth%2==0 (Even), prune references not appearing above. Would have to be breadth wise
    
    if depth > 2:
        citations = {}
        for reference in papers[data['paperId']]['references']:
            citations[reference['paperId']] = GetCitations(reference['paperId'])
        
        #if len(citations) > top_n:
        citations = sorted(citations, key=lambda x: x[1], reverse=True)
        if top_n != -1:
            citations = citations[:top_n]
        
        papers[data['paperId']]['references'] = [reference for reference in papers[data['paperId']]['references'] if reference['paperId'] in citations]

        for reference in papers[data['paperId']]['references']:
            GetReferences(reference['paperId'], False, depth-1, top_n)
            reference['citations'] = papers[reference['paperId']]['citations']
            
        #if len(papers[data['paperId']]['references']) > top_n:
        #    if top_n != -1:
        #        papers[data['paperId']]['references'] = sorted(papers[data['paperId']]['references'], key=lambda x: x['citations'], reverse=True)[:top_n]
        #    else:
        #        papers[data['paperId']]['references'] = sorted(papers[data['paperId']]['references'], key=lambda x: x['citations'], reverse=True)

def GetCitations(reference_id):
    if reference_id in memory:
        data = memory[reference_id]
    else:
        link = 'http://api.semanticscholar.org/v1/paper/{}'.format(reference_id)

        with urllib.request.urlopen(link) as paper:
            data = json.loads(paper.read().decode())
        memory[reference_id] = data
        
    return len(data['citations'])
############################################

@app.route('/')
def index():
    return render_template('/index.html')

@app.route('/graph', methods = ['POST', 'GET'])
def display_graph():
    if request.method == 'POST':
        id = request.form['id']
        GetReferences(id, True, 3, 5)
        paper_itself = papers[next(iter(papers.keys()))]
        return render_template('graph.html', paper = paper_itself)

if __name__ == '__main__':
    app.run(debug=True) 