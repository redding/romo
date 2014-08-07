require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::Scaffolding; end
class ViewHandlers::Scaffolding

  class Tables
    include ViewHandlers::Layouts::Docs

    page_title{ 'Scaffolding: Tables' }

    def run!
      render 'scaffolding/tables.html'
    end

  end

end
