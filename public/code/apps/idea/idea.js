import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {ContentBuilder} from "../../content/content_builder.js";
import {TextAreaInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder.js";
import {ContainerItemBuilder} from "../../ui/elements/container_item_builder.js";
import {SwapContents} from "../../ui/view_helper.js";
import {SearchBarBuilder} from "../../ui/elements/searchBarBuilder.js";
import {ContentApp} from "../../content/content_app.js";
import {ConsoleHtml} from "../../ui/elements/console_html.js";
import {NavBuilder} from "../../ui/elements/nav_builder.js";

function RenderContent(){
    return new ElementBuilder()
        .withClass('ContentContainer')
        .build();
}

export class IdeaApp extends ContentApp {
    constructor() {
        super(new ContentBuilder('Idea')
            .withProperty(
                'title',
                (title) => {return title},
                (title) => {
                    return new ElementBuilder('h2')
                        .withInnerHtml(title)
                }, (title) => {
                    return new TextInputBuilder()
                        .withInnerHtml(title)
                })
            .withProperty(
                'content',
                (content) => {return content},
                (content)=> {
                    return new ElementBuilder()
                        .withInnerHtml(content)
                },
                (content) => {
                    return new TextAreaInputBuilder()
                        .withInnerHtml(content)
                })
            .build())
    }

    OnStart()  {
        let nav = new NavBuilder()
            .add('Remember', () => {
                if (this.Screen !== 'mem'){
                    this.ToRemember();
                    this.Screen = 'mem';
                }
            })
            .add('Add', () => {
                if (this.Screen !== 'add'){
                    this.ToAdd();
                    this.Screen = 'add';
                }
            })
        this.ToolView = new ElementBuilder()
        this.Content = new ContainerItemBuilder()
        this.View = new ElementBuilder()
            .withChildBuilder(nav)
            .withChildBuilder(this.ToolView)
            .withChildBuilder(this.Content)
            .build();
        SwapContents(document.body, this.View)
        this.ToRemember();
    }

    async OnSearch(search_str){
        try {
            let items = await this.Kind.Api.get_tagged(search_str);
            if (items.length > 0){
                this.Content.addMany(items.map(i => {
                    return [i.id, this.Kind.GetView(i)]
                }))
            } else {
                this.Content.withInnerHtml("No results for " + search_str)
            }
        } catch (e) {
            this.Content.withInnerHtml(e.message);
        }
    }

    ToRemember() {
        this.ToolView
            .withoutContents()
            .withChildBuilder(
                new SearchBarBuilder(
                    (search_str) => {this.OnSearch(search_str)})
            )
        this.Content.clear();
    }

    ToAdd() {
        this.ToolView
            .withoutContents()
            .withChildBuilder(this.Kind.GetAddView((item) => {
                let c = new ConsoleHtml();
                let view = this.Kind.GetView(item);
                view.withChildBuilder(c.View);
                c.Info("Saving...")

                this.Content.add(item, view)
                this.Kind.Api.add(item)
                    .then(() => {
                        c.Info("Saved successfuly!")
                    })
                    .catch(err => {
                        c.Error(err.message)
                    })
            }));
        this.Content.clear();
    }
}

